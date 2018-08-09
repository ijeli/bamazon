var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jjb117jjB",
    database: "bamazon",
    insecureAuth : true
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
});

var nodeArgv = process.argv;
var command = process.argv[2];
var x = "";

for (var i = 3; i < nodeArgv.length; i++){
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    }
    else {
        x = x + nodeArgv[i];
    }
}

switch(command) {
    case "View-Products-for-Sale": 
        console.log("View Products");
        queryAllProducts()
    break;
    case "View-Low-Inventory":
        console.log("View Low Inventory");
        viewLowInventory()
    break;
    case "Add-to-Inventory":
        console.log("Add to Inventory");
        addInventoryPrompt()
    break;
    case "Add-a-Product":
        console.log("Add a Product");
        addProductPrompt();
    break;
    default:
        console.log("{Please enter a command: View-Products-for-Sale, View-Low-Inventory, Add-to-Inventory, Add-a-Product}");
        connection.end()
    break;
}

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
        + res[i].price + " | " + res[i].stock_quantity) 
      }
      console.log("-----------------------------------------------------");
      connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity <= 5) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
            + res[i].price + " | " + res[i].stock_quantity) 
        }
      }
      console.log("-----------------------------------------------------");
      connection.end();
    });
}

function addInventoryPrompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "product_confirm",
            message: "Would you like to restock a product?",
            default: false
        }
    ])
    .then(function(inquirerResponse) {
        if (inquirerResponse.product_confirm) {
            addInventory()
        }
    });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "what_item_id",
            message: "What product would you like to restock?"
        },
        {
            type: "input",
            name: "quantity_added",
            message: "How many would you like to restock?"
        },
        {
            type: "confirm",
            name: "restock_confirm",
            message: "Are you sure?",
            default: false
        }
    ])
    .then(function(inquirerResponse) {
        var itemID = inquirerResponse.what_item_id;
        var restock = inquirerResponse.quantity_added;
        if (inquirerResponse.restock_confirm) {
            connection.query("SELECT * FROM products", function(err, res) {
                var inStock = res[(itemID-1)].stock_quantity;
                added(itemID, restock, inStock)
            });
        }
    });
}

function added(x, y, z) {
    total = parseFloat(y) + parseFloat(z);

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: total
            },
            {
                item_id: x
            }
        ],
        function(err, res) {
            if (err) {
                throw err
            }
            else {
                console.log("\nYou have been restocked");
                connection.end();
            }
        }
    );
}

function addProductPrompt () {
    inquirer.prompt([
        {
            type: "confirm",
            name: "add_product_confirm",
            message: "Would you like to add a Product?",
            default: false
        }
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.add_product_confirm) {
            addProduct()
        }
    });
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "what_product_name",
            message: "What is the name of your product?"
        },
        {
            type: "input",
            name: "what_department",
            message: "What department does it belong to?"
        },
        {
            type: "input",
            name: "what_price",
            message: "How much is your product?"
        },
        {
            type: "input",
            name: "how_many",
            message: "What quantity are you providing?"
        },
        {
            type: "confirm",
            name: "product_confirm",
            message: "Are you sure?",
            default: false
        }
    ])
    .then(function(inquirerResponse) {
        if(inquirerResponse.product_confirm) {
            var name = inquirerResponse.what_product_name;
            var department = inquirerResponse.what_department;
            var price = inquirerResponse.what_price;
            var quantity = inquirerResponse.how_many;
            added(name, department, price, quantity)
        }
    });
}

function added(w, x, y, z) {
    connection.query(
        "INSERT INTO products SET ?", 
        {
            product_name: w,
            department_name: x,
            price: parseFloat(y),
            stock_quantity: parseFloat(z)
        },
        function(err, res) {
            console.log("Product added")
            connection.end();
        }
    );
}


        