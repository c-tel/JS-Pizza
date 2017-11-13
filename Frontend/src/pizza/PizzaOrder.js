var name, phone, address;


function validateName(){
    name = $("#input_name").val();
    if(name.match(/^([a-zA-Zа-яА-Я]+|[ ]|[\-])+$/)){
        $(".name").removeClass("has-danger");
        $(".name").addClass("has-success");
        $("#check_name").hide();
        return true;
    }else{
        $(".name").removeClass("has-success");
        $("#check_name").show();
        $(".name").addClass("has-danger");
        return false;
    }
}

function validatePhone(){
    phone = $("#input_phone").val();
    if(phone.match(/^(\+380|0)\d{9}$/)){
        $(".phone").removeClass("has-danger");
        $(".phone").addClass("has-success");
        $("#check_phone").hide();
        return true;
    }else{
        $(".phone").removeClass("has-success");
        $(".phone").addClass("has-danger");
        $("#check_phone").show();
        return false;
    }
}

function validateAddress(){
    address = $("#input_address").val();
    if(address.match(/^([a-zA-Zа-яА-Я]+|[ .,\-]|\d+)+$/)){
        $(".address").removeClass("has-danger");
        $(".address").addClass("has-success");
        $("#check_address").hide();
        return true;
    }else{
        $(".address").removeClass("has-success");
        $(".address").addClass("has-danger");
        $("#check_address").show();
        return false;
    }
}

function initializeValidation(){
    $("#input_phone").on("input", function () {
        validatePhone();
    });
    $("#input_address").on("input", function () {
        validateAddress();
    });
    $("#input_name").on("input", function () {
        validateName();
    });
}

function initSubmit() {
    var API = require("../API");
    var Cart = require("./PizzaCart");
    Cart = Cart.getPizzaInCart();
    var body;
    var order;
    $("#btn-submit").click(function () {
        if(formIsValid()){
            order = [];
            Cart.forEach(function (pizza_cart) {
                order.push([pizza_cart.pizza.title,pizza_cart.size[1], pizza_cart.quantity]);
            });
            body = {
                cart: order,
                recipient: name,
                address: address,
                phone: phone
            };
            API.createOrder(body);
        }
    });
}

function formIsValid() {
    var a = validateName();
    var b = validatePhone();
    var c =validateAddress();
    return a&&b&&c;
}

exports.initSubmit = initSubmit;
exports.initializeValidation = initializeValidation;