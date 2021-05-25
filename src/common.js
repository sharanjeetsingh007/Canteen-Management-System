export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  export const removeProductFromCart = (pid) => {
    var items = [];
    var products = JSON.parse(sessionStorage.getItem("_products") || "[]");
    products.forEach(function(item, index) {
        if (item.pid !== pid)
        {
            items.push(item);
        }
        else
        {
            if (item.count > 1)
            {
                item.count--;
                item.total = item.price * item.count;
                items.push(item);
            }
        }
    });
    sessionStorage.setItem("_products", JSON.stringify(items));
  }

  export const getCartsToString = () => {
    let result = [];
    var products = JSON.parse(sessionStorage.getItem("_products") || "[]");

    products.forEach(function(item, index) {
        result.push(
            item.name + " $" + item.price + " x " + item.count + " = $" + item.total
        ); 
    });

    return result;
  }

  export const addProductToCart = (pid, name, price, imgurl) => {

    var products = JSON.parse(sessionStorage.getItem("_products") || "[]");

    var found = false;
    products.forEach(function(item, index) {
        if (item.pid === pid)
        {
            found = true;
            item.count++;
            item.total = item.price * item.count;
        }
    });

    
    if (!found)
    {
        // Modifying
        var item = {
            pid: pid,
            name: name,
            price: price,
            imgurl: imgurl,
            total: price * 1,
            count: 1
        };
        products.push(item);
    }

    // Saving
    sessionStorage.setItem("_products", JSON.stringify(products));
}

export const getCartItem = () => {
    return JSON.parse(sessionStorage.getItem('_products') || "[]");
}

export const removeAllProductFromCart = () => {
    let products = [];
    sessionStorage.setItem("_products", JSON.stringify(products));
}

export const getCartCount = () => {
    var products = JSON.parse(sessionStorage.getItem("_products") || "[]");
    var count = 0;
    products.forEach(function(item, index) {
        count += item.count;
    });
    return count;
}

export const getTotalPrice = () => {
    var products = JSON.parse(sessionStorage.getItem("_products") || "[]");
    var count = 0;
    products.forEach(function(item, index) {
        count += item.count * item.price;
    });
    return count;
}

export default function componentLoader(lazyComponent, attemptsLeft, interval) {
    return new Promise((resolve, reject) => {
        lazyComponent()
        .then(resolve)
        .catch((error) => {
            // let us retry after 1500 ms
            setTimeout(() => {
                if (attemptsLeft === 1) {
                    reject(error);
                    return;
                }
                componentLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
            }, 5000);
        });
    });
}

export const validateData = (type, value) => {

    let errors = "";
    let isValid = true;

    if (type === 'name' && !value) {
      isValid = false;
      errors = "Please enter your name.";
    }

    if (type === 'email' && !value) {
      isValid = false;
      errors = "Please enter your email Address.";
    }

    if (type === 'email' && typeof value !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(value)) {
        isValid = false;
        errors = "Please enter valid email address.";
      }
    }

    if (type === 'phone' && !value) {
      isValid = false;
      errors = "Please enter your phone number.";
    }

    if (type === 'phone' && typeof value !== "undefined") {
        
      var pattern = new RegExp(/^\+[0-9\b]+$/);
      if (!pattern.test(value)) {
        isValid = false;
        errors = "Please enter only number.";
      }else if(value.length < 10){
        isValid = false;
        errors = "Please enter valid phone number.";
      }
    }

    return [isValid, errors];
}