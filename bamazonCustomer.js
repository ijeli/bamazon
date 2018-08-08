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
    queryAllProducts();
    //connection.end();
});

function queryUpdateProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
        + res[i].price + " | " + res[i].stock_quantity) 
      }
      console.log("-----------------------------------------------------");
      promptCloser();
    });
}

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
        + res[i].price + " | " + res[i].stock_quantity) 
      }
      console.log("-----------------------------------------------------");
      promptOpener()
    });
}

function promptOpener() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "opener",
            message: "Would you like to purchase any climbing gear from BAmazon?",
            default: true
        }
    ])
    .then(function(inquirerResponse) {
        if (inquirerResponse.opener) {
            console.log("Excellent!");
            selectAndBuy();
        }
        else {
            console.log("Thanks for Shopping at Bamazon!");
            connection.end();
        }
    });
}

function promptCloser() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "opener",
            message: "Would you like to make another purchase?",
            default: true
        }
    ])
    .then(function(inquirerResponse) {
        if (inquirerResponse.opener) {
            console.log("Excellent!");
            selectAndBuy();
        }
        else {
            console.log("Thanks for Shopping at Bamazon!");
            connection.end();
        }
    });
}

function selectAndBuy() {
    inquirer.prompt([        
        {
            type: "input",
            name: "what_to_buy",
            message: "Please insert the item ID number you would like to buy"
        },
        {
            type: "input",
            name: "quanitiy_to_buy",
            message: "How many would you like to buy?"
        }
    ])
    .then(function(inquirerResponse) {
        var quanitiy_to_buy = inquirerResponse.quanitiy_to_buy
        var itemID =  inquirerResponse.what_to_buy;
        connection.query("SELECT * FROM products", function(err, res) {
            var inStock = res[(itemID-1)].stock_quantity;
            var itemPrice = res[(itemID-1)].price;
            function isThereEnough () {
                if (inStock <= 0) {
                    console.log(
                        "-----------------------------------\nInsufficient Quantity \n-----------------------------------"
                    )
                }
                else {
                    buyItems(quanitiy_to_buy, itemID, inStock, itemPrice);
                }
            };
            isThereEnough();
            queryUpdateProducts();
        });
    });
}

function buyItems(x, y, z, v) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (z - x)
            },
            {
                item_id: y
            }
        ],
        function(err, res) {
            if (err) {
                throw err
            }
            else {
                console.log("\nThank you for your purchase!\n-----------------------------------")
                console.log("Your total price is: $" + parseFloat(v * x).toFixed(2) + "\n-----------------------------------")
            }
        }
    );
}
