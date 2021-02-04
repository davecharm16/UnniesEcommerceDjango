function Products(name, image, price, type, stocks, variety, gallery, rate, qty) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.type = type;
    this.stocks = stocks;
    this.variety = variety;
    this.gallery = gallery;
    this.rate = rate;
    this.qty = qty;
    this.mark = "f";
    this.proc = "COD";
    this.id = 1;
}

var featured = [
    new Products("Map of the Soul", "./images/product-image/featured/featured1.jpg", 2200, "album", 200, [], ["./images/product-image/featured/featured1.jpg", "./images/product-image/albums/bts/bts2var/bt1.jpg", "./images/product-image/albums/bts/bts2var/bt2.jpg"], 4, 1),
    new Products("Black Pink The Album", "./images/product-image/featured/featured2.jpg", 2350, "album", 150, [], ["./images/product-image/featured/featured2.jpg", "./images/product-image/albums/bp/bpvar/bp1.png"], 5, 1),
    new Products("Twice Fancy Album", "./images/product-image/featured/featured3.jpg", 2300, "album", 200, [], ["./images/product-image/featured/featured3.jpg", "./images/product-image/albums/twice/twicevar/t1.jpg"], 4, 1),
];
//------carousel

var sideFeature = [
    new Products("Map of of the Soul Hoodie", "./images/product-image/featured/featured4.png", 700, "merchandise", 200, [
        ["Grey", "Blue", "Green", "Red"],
        ["S", "M", "L"]
    ], ["./images/product-image/featured/featured4.png", "./images/product-image/featured/featured bt var/1.png", "./images/product-image/featured/featured bt var/2.jpg"], 4, 1),
    new Products("Black Pink Light Stick", "./images/product-image/featured/featured5.jpg", 1500, "fanlight", 200, [], ["./images/product-image/featured/featured5.jpg"], 5, 1),
];

var viewProduct;
const showDialog = () => {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${scrollY}`;
    $('.log-modal').css("margin-top", `${scrollY}`);
};
const closeDialog = () => {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // document.getElementById('dialog').classList.remove('show');
}
window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

function logIn() {
    setTimeout(function() {
        let logIn;
        if (localStorage.getItem('logIn') === null) {
            localStorage.setItem('logIn', 'false');
        } else {
            logIn = JSON.parse(localStorage.getItem('logIn'));
        }
        logIn = JSON.parse(localStorage.getItem('logIn'));
        if (logIn === false) {
            $('.log-container').hide();
            $('.log-modal').addClass("log-show");
            showDialog();
            displaySignIn();
        } else {
            $('.log-modal').hide("slow");
            closeDialog();
        }
    }, 1000);
}

function Questions(question, name, type, placeholder) {
    this.question = question;
    this.name = name;
    this.type = type;
    this.placeholder = placeholder;
}

function UserPass(prompt, name, type, placeholder) {
    this.prompt = prompt;
    this.name = name;
    this.type = type;
    this.placeholder = placeholder;
}
questions = [
    new Questions("What is your full name ?", "name", "text", "Enter your name"),
    new Questions("What is your Address ?", "address", "text", "Enter your address"),
    new Questions("What is your Phone Number", "phone", "number", "Enter your phone number"),
    new Questions("What is your E-mail", "email", "email", "Enter your E-mail"),
    new Questions("Type your Username", "username", "text", "Enter your Username"),
    new Questions("Type Your Password", "password", "password", "Enter your Password"),
]



var s = 0;

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function displaySignIn() {
    $('.s').click(function() {
        displayLogIn();
    });
    if (s === 0) {
        $('.back').addClass("back-dead");
    }
    $('.sign-container').slideDown("slow").css("display", "flex");
    $('.next').click(function() {
        var x = $('.input-sign').val();
        if (x === "" && s <= 5) {
            s = s;
            alert("Enter Value on the Input Field");
        } else if (s === 3 && !validateEmail(x)) {
            s = s;
            alert("Enter Valid Email");
        } else if (s < 6) {
            localStorage.setItem(`${questions[s].name}`, `${JSON.stringify(x)}`);
            $('.input-sign').val("");
            s += 1;
        }

        if (s == 6) {
            $('.sign-container').slideUp("slow").hide();
            displayConfirmation();
        } else {
            console.log(s);
            displayQuest(s);
            $('.set-up').text(`Set up your Account. ${s+1}/6`);
            $('.sign-container').slideDown("slow").css("display", "flex");
        }


    });
    $('.back').click(function() {
        s -= 1;
        displayQuest(s);
        $('.set-up').text(`Set up your Account. ${s+1}/6`);
        $('.sign-container').slideDown("slow").css("display", "flex");
    });
}


function displayLogIn() {
    $('.confirmation').slideUp("slow").hide();
    $('.sign-container').slideUp("slow").hide();
    $('.log-container').slideDown("slow").css("display", "flex");
    $('.in-out').children().remove();
}
$('.log-next').click(function() {
    window.location.href = "index.html";
    localStorage.setItem('logIn', 'true');
});

function displayConfirmation() {
    $('.confirmation').slideDown("slow").css("display", "flex");
    $('.log-in').click(function() {
        displayLogIn();
    });
}

function displayQuest(s) {
    if (s === 0) {
        $('.back').addClass("back-dead");
    } else {
        $('.back').removeClass("back-dead");
    }
    if (s === 5) {
        $('.next').text('Sign Up').attr("type", "submit");
    } else {
        $('.next').text('Next');
    }

    $('.set-up').text(`Set up your Account. ${s+1}/6`);
    $('.sign-container').slideUp("fast");

    $('.set-up').text(`Set up your account. ${s}/6`);
    $('.question').text(questions[s].question);
    $(".input-sign").attr({
        type: `${questions[s].type}`,
        name: `${questions[s].name}`,
        placeholder: `${questions[s].placeholder}`,
    });
}

var carouselBox = $('.carousel-box');
for (let i = 0; i < featured.length; i++) {
    if (i == 0) {
        carouselBox.append(
            `<div class="carousel-container">
                <img class="featured-photo" src="${featured[i].image}">
                <div class="left-click"></div>
                <div class="right-click"></div>
    
                <div class="caption">
                    <div class="title">${featured[i].name}</div>
                    <div class="sale">UP to <span>40% off</span></div>
                    <div class="act-button"><a href="#">Shop now</a></a>
                    </div>
                </div>
    
                <div class="indicator">
                    <div class="circle c-active"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
        `);
    } else {
        carouselBox.append(
            `<div class="carousel-container hide">
                <img class="featured-photo" src="${featured[i].image}">
                <div class="left-click"></div>
                <div class="right-click"></div>
    
                <div class="caption">
                    <div class="title">${featured[i].name}</div>
                    <div class="sale">UP to <span>40% off</span></div>
                    <div class="act-button"><a href="#">Shop now</a></a>
                    </div>
                </div>
    
                <div class="indicator">
                    <div class="circle"></div>
                    <div class="circle c-active"></div>
                    <div class="circle"></div>
                </div>
            </div>
        `);

    }

}

var containerSide = $('.container-side')
for (let s = 0; s < sideFeature.length; s++) {
    containerSide.append(
        `
    <div class="side-feature">
        <img src="${sideFeature[s].image}">
        <div class="caption">
            <div class="title">${sideFeature[s].name}</div>
            <div class="act-button"><a href="#">View Product</a></div>
        </div>
    </div>`
    );
}


$('.left-click').click(function() {
    var current = $('.carousel-container:visible').index();
    var next = 0;
    var last = $('.carousel-container:last').index();

    $('.carousel-container:visible').children().eq(4).find('.circle').eq(current).addClass("c-active").siblings().removeClass("c-active")

    // $('.carousel-container').eq(current).animate({ "right": "100%" }, 1000);
    // $('.carousel-container').eq(current).animate({ "right": "" }, 1000);
    if (current == last) {
        var next = 0;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');
        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');

    } else {
        next = current + 1;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');

        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');

    }
});


$('.right-click').click(function() {
    var current = $('.carousel-container:visible').index();
    var last = $('.carousel-container:last').index();

    $('.carousel-container:visible').children().eq(4).find('.circle').eq(current).addClass("c-active").siblings().removeClass("c-active");
    // $('.carousel-container').eq(current).animate({ "left": "100%" }, 1000);
    // $('.carousel-container').eq(current).animate({ "left": "" }, 1000);

    if (current == 0) {
        next = last;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');
        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');
    } else {
        next = current - 1;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');

        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');
    }
});

$('.icon-search').click(() => {
    $('input[name="search"]').toggle("slow");
});

setInterval(function() {
    var current = $('.carousel-container:visible').index();
    var next = 0;
    var last = $('.carousel-container:last').index();

    $('.carousel-container:visible').children().eq(4).find('.circle').eq(current).addClass("c-active").siblings().removeClass("c-active")

    // $('.carousel-container').eq(current).animate({ "right": "100%" }, 1000);
    // $('.carousel-container').eq(current).animate({ "right": "" }, 1000);
    if (current == last) {
        var next = 0;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');
        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');

    } else {
        next = current + 1;
        $('.carousel-box').find(".carousel-container").eq(next).removeClass('hide');

        $('.carousel-box').find(".carousel-container").eq(current).addClass('hide');

    }
}, 5000);
// -- end carousel




$('.side-feature').click(
    function() {
        var y = JSON.stringify(sideFeature[$(this).index()]);
        localStorage.setItem('view', y);
        window.location.href = "view.html";
        //yow
    }
);

$('.carousel-container .caption .act-button').click(function() {
    var y = JSON.stringify(featured[$(this).parent().parent().index()]);
    localStorage.setItem('view', y);
    window.location.href = "view.html";
});


//Featured Area

var topSellers = [
    new Products("Twice- Eyes wide Open", "./images/product-image/albums/twice/twice1.jpg", 1100, "album", 250, [], ["./images/product-image/albums/twice/twice1.jpg", "./images/product-image/albums/twice/twicevar/t2.jpg", "./images/product-image/albums/twice/twicevar/t3.jpg"], 4, 1),
    new Products("Twice - Mina Photobook", "./images/product-image/photo-book/twice/twice1.png", 550, "photobook", 250, [], ["./images/product-image/photo-book/twice/twice1.png"], 4, 1),
    new Products("Black Pink -Light Stick", "./images/product-image/featured/featured5.jpg", 1299, "fanlight", 200, [], ["./images/product-image/featured/featured5.jpg"], 5, 1),
    new Products("BTS- Fan Light V3", "./images/product-image/fanlight/bts/bts2.jpg", 1599, "fanlight", 200, [], ["./images/product-image/fanlight/bts/bts2.jpg"], 5, 1),
    new Products("Twice - Choker", "./images/product-image/accessories/twice/twice2.jpg", 399, "accessories", 250, [], ["./images/product-image/accessories/twice/twice2.jpg", "./images/product-image/merchandise/twice choke/1.png"], 5, 1),
    new Products("BTS - Coin Purse", "./images/product-image/accessories/bts/bts2.jpg", 599, "accessories", 250, [
        ["black", "red", "blue", "green", "grey"]
    ], ["./images/product-image/accessories/bts/bts2.jpg", ], 5, 1),
];

$('.products-html').ready(function() { updateFeatureContent(); });



function updateFeatureContent() {
    var prodArray = topSellers;
    for (let x = 0; x < prodArray.length; x++) {
        $('.featured-holder').append(
            `
            <div class="featured-card">
                <div class="img-cont">
                    <img class="product-image" src="${prodArray[x].image}">
                </div>
                <div class="product-name">${prodArray[x].name}</div>
                <div class="product-sold">Sold: ${prodArray[x].stocks} pcs</div>
            </div>
            `
        );
    }
    $('.featured-card').click(
        function() {
            // console.log(prodArray[$(this).index()]);
            var y = JSON.stringify(prodArray[$(this).index()]);
            localStorage.setItem('view', y);
            window.location.href = "view.html";
            // updateView();
        }
    );
}



// Product Area
var albums = [
    new Products("BTS - Dynamite Album", "./images/product-image/albums/bts/bts1.jpg", 1200, "album", 250, [], ["./images/product-image/albums/bts/bts1.jpg", "./images/product-image/albums/bts/bts1var/1.jpg", "./images/product-image/albums/bts/bts1var/2.jpg"], 5, 1),
    new Products("BTS - Map of the Soul", "./images/product-image/albums/bts/bts2.jpg", 1300, "album", 250, [], ["./images/product-image/albums/bts/bts2.jpg", "./images/product-image/albums/bts/bts2var/bt1.jpg", "./images/product-image/albums/bts/bts2var/bt2.jpg"], 4, 1),
    new Products("BTS - Wings Album", "./images/product-image/albums/bts/bts3.jpg", 1150, "album", 250, [], ["./images/product-image/albums/bts/bts3.jpg"], 4, 1),
    new Products("Twice- Eyes wide Open", "./images/product-image/albums/twice/twice1.jpg", 1100, "album", 250, [], ["./images/product-image/albums/twice/twice1.jpg", "./images/product-image/albums/twice/twicevar/t2.jpg", "./images/product-image/albums/twice/twicevar/t3.jpg"], 4, 1),
    new Products("Black Pink The Album", "./images/product-image/featured/featured2.jpg", 2350, "album", 150, [], ["./images/product-image/featured/featured2.jpg", "./images/product-image/albums/bp/bpvar/bp1.png"], 5, 1),
    new Products("Black Season Greetings", "./images/product-image/albums/bp/bp1.jpg", 1950, "album", 150, [], ["./images/product-image/albums/bp/bp1.jpg"], 4, 1),
];
var merchandise = [
    new Products("Map of of the Soul Hoodie", "./images/product-image/featured/featured4.png", 700, "merchandise", 200, [], ["./images/product-image/featured/featured4.png"], 5, 1),
    new Products("Black Pink Shirt and Short", "./images/product-image/merchandise/bp1.jpg", 950, "merchandise", 200, [], ["./images/product-image/merchandise/bp1.jpg"], 5, 1),
    new Products("BTS - Hoodie", "./images/product-image/merchandise/BTS1.jpg", 750, "merchandise", 200, [], ["./images/product-image/merchandise/BTS1.jpg"], 4, 1),
    new Products("BTS - Mini Bag", "./images/product-image/merchandise/bts2.jpg", 650, "merchandise", 200, [], ["./images/product-image/merchandise/bts2.jpg"], 5, 1),
    new Products("Black Pink The Album Hoodie", "./images/product-image/merchandise/bp3.jpg", 950, "merchandise", 200, [
        ["Black", "Grey", "Pink", "Blue"],
        ["S", "M", "L", "XL", "XS"]
    ], ["./images/product-image/merchandise/bp3var/1.jpg", "./images/product-image/merchandise/bp3var/3.jpg", "./images/product-image/merchandise/bp3var/4.jpg", "./images/product-image/merchandise/bp3var/5.jpg"], 4, 1),
    new Products("Black Pink Cap", "./images/product-image/merchandise/bp2.jpg", 400, "merchandise", 200, [], ["./images/product-image/merchandise/bp2.jpg"], 5, 1),
];
var photobook = [
    new Products("Twice - Mina Photobook", "./images/product-image/photo-book/twice/twice1.png", 550, "photobook", 250, [], ["./images/product-image/photo-book/twice/twice1.png"], 4, 1),
    new Products("Twice - Nayeon Cosmopolitan", "./images/product-image/photo-book/twice/twice2.jpeg", 700, "photobook", 250, [], ["./images/product-image/photo-book/twice/twice2.jpeg"], 5, 1),
    new Products("BTS - Photobook 2020", "./images/product-image/photo-book/bts/bts1.jpg", 300, "photobook", 250, [], ["./images/product-image/photo-book/bts/bts1.jpg"], 5, 1),
    new Products("BTS - Photobook vol.2", "./images/product-image/photo-book/bts/bts2.jpg", 450, "photobook", 250, [], ["./images/product-image/photo-book/bts/bts2.jpg"], 5, 1),
    new Products("Black Pink - Photobook Limited", "./images/product-image/photo-book/bp/bp1.jpg", 550, "photobook", 250, [], ["./images/product-image/photo-book/bp/bp1.jpg"], 4, 1),
    new Products("Black Pink - Photobook Japan Edition", "./images/product-image/photo-book/bp/bp2.jpg", 460, "photobook", 250, [], ["./images/product-image/photo-book/bp/bp2.jpg"], 4, 1),
];

var fanLight = [
    new Products("Black Pink -Light Stick", "./images/product-image/featured/featured5.jpg", 1299, "fanlight", 200, [], ["./images/product-image/featured/featured5.jpg"], 5, 1),
    new Products("BTS- Fan Light - Map of the Soul", "./images/product-image/fanlight/bts/bts1.jpg", 2999, "fanlight", 200, [], ["./images/product-image/fanlight/bts/bts1.jpg"], 4, 1),
    new Products("BTS- Fan Light V3", "./images/product-image/fanlight/bts/bts2.jpg", 1599, "fanlight", 200, [], ["./images/product-image/fanlight/bts/bts2.jpg"], 5, 1),
    new Products("Twice- Fan light Candy Bong Z", "./images/product-image/fanlight/twice/twice1.jpg", 1799, "fanlight", 200, [], ["./images/product-image/fanlight/twice/twice1.jpg"], 5, 1),
    new Products("Exo- Fan light V3 ", "./images/product-image/fanlight/exo/exo1.jpg", 1299, "fanlight", 200, [], ["./images/product-image/fanlight/exo/exo1.jpg"], 5, 1),
    new Products("Astro- Fan light V2 ", "./images/product-image/fanlight/astro/astro1.jpg", 1199, "fanlight", 200, [], ["./images/product-image/fanlight/astro/astro1.jpg"], 4, 1),
];
var accessories = [
    new Products("Twice - Tumbler", "./images/product-image/accessories/twice/twice1.png", 799, "accessories", 250, [], ["./images/product-image/accessories/twice/twice1.png"], 5, 1),
    new Products("Twice - Choker", "./images/product-image/accessories/twice/twice2.jpg", 399, "accessories", 250, [], ["./images/product-image/accessories/twice/twice2.jpg", "./images/product-image/merchandise/twice choke/1.png"], 5, 1),
    new Products("Twice - Coin Purse", "./images/product-image/accessories/twice/twice3.jpg", 599, "accessories", 250, [], ["./images/product-image/accessories/twice/twice3.jpg"], 4, 1),
    new Products("Twice - Eyeglass Pouch", "./images/product-image/accessories/twice/twice4.jpg", 799, "accessories", 250, [], ["./images/product-image/accessories/twice/twice4.jpg"], 5, 1),
    new Products("Black Pink - Key chain", "./images/product-image/accessories/bp/bp2.jpg", 199, "accessories", 250, [], ["./images/product-image/accessories/bp/bp2.jpg"], 5, 1),
    new Products("Black Pink - Charger Docker", "./images/product-image/accessories/bp/bp3.jpg", 499, "accessories", 250, [], ["./images/product-image/accessories/bp/bp3.jpg"], 5, 1),
    new Products("BTS - Key Chain", "./images/product-image/accessories/bts/bts1.jpg", 199, "accessories", 250, [], ["./images/product-image/accessories/bts/bts1.jpg"], 5, 1),
    new Products("BTS - Coin Purse", "./images/product-image/accessories/bts/bts2.jpg", 599, "accessories", 250, [
        ["black", "red", "blue", "green", "grey"]
    ], ["./images/product-image/accessories/bts/bts2.jpg", ], 5, 1),
];


var productHolder = $('.product-holder');
var productType = $('.product-type h2');

var select = $('.select select');
var selectedValue = select.val();

function selectedProduct() {
    switch (selectedValue) {
        case "album":
            return albums;
            break;
        case "merchandise":
            return merchandise;
            break;
        case "photobook":
            return photobook;
            break;
        case "fanlight":
            return fanLight;
            break;
        case "accessories":
            return accessories;
            break;
        default:
            "album";
    }
}


$('.products-html').ready(function() { updateContent(); });

function updateContent() {
    selectedValue = select.val();
    var selectedTitle = $('select option:selected').text();

    productType.text(selectedTitle);

    console.log(selectedValue);
    var prodArray = selectedProduct();
    //remove first the display products
    $('.product-card').remove();

    for (let x = 0; x < prodArray.length; x++) {
        productHolder.append(
            `
            <div class="product-card">
                    <img class="product-image" src="${prodArray[x].image}">
                    <div class="product-name">${prodArray[x].name}</div>
                    <div class="product-price">₱${prodArray[x].price}</div>
            </div>
            `
        );
    }
    $('.product-card').click(
        function() {
            // console.log(prodArray[$(this).index()]);
            var y = JSON.stringify(prodArray[$(this).index()]);
            localStorage.setItem('view', y);
            window.location.href = "view.html";
            // updateView();
        }
    );
}

select.change(updateContent);



//CLicking products


function updateView() {
    //new Products("BTS - Coin Purse", "./images/product-image/accessories/bts/bts2.jpg", 599, "accessories", 250, [], ["./images/product-image/accessories/bts/bts2.jpg"]),
    // name, image, price, type, stocks, variety, gallery

    var view = $('.view-body');
    var item = localStorage.getItem('view');
    item = JSON.parse(item);
    const price = item.price;
    const name = item.name;
    const img = item.gallery[0];
    const gallery = item.gallery;
    const variety = item.variety;
    const stocks = item.stocks;
    const sold = Math.floor(Math.random() * (stocks - 15));
    const available = stocks - sold

    view.append(
        `
        <div class="gallery-container">
            <div class="view-photo">
            </div>
            <div class="gallery-photo">
            </div>
        </div>
        <div class="gallery-container descriptions">
            <div class="item-title">
                Black Pink The Album Hoodie
            </div>
            <div class="item-status">
                <div class="solds-rate">
                </div>
            </div>
            <div class="item-price">
                ₱799
            </div>
            <div class="variation">
                <div class="var-text">Variation</div>
                <div class="var">
                </div>
            </div>
            <div class="quantity-container">
                <div class="q-text">Quantity</div>
                <div class="q-button">
                    <button class="op minus">-</button>
                    <div class="quantity">0</div>
                    <button class="op plus">+</button>
                </div>
                <div class="stocks">
                    <div class="stock-text">200 piece/s available</div>
                </div>
            </div>
            <div class="add-cart">
                Add to Cart
            </div>
        </div>
        `
    );

    var photo = $('.view-photo');
    photo.append(`
    <img src="${gallery[0]}">
    `);

    createGallery($('.gallery-photo'), gallery);

    $('.item-title').text(`${item.name}`);

    setRating($('.solds-rate'), item.rate, sold);

    $('.item-price').text(`₱${item.price}`);

    createVariation($('.var'), variety);
    $('.quantity').text(item.qty.toString());
    $('.plus').click(function() {
        addQty(item);
    });
    $('.minus').click(function() {
        minQty(item);
    });

    $('.stock-text').text(`${available} piece/s available`)
    console.log(item);

    $('.var-photo').click(
        function() {
            var index = $(this).index();
            $('.view-photo img').attr("src", gallery[index]);
        }
    );

    $('.add-cart').click(() => {
        alert('Item Added to Cart!');
        addCart(item);
    });
}

function addCart(item) {
    let cart;
    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', '[]');
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}


function createGallery(place, gallery) {
    // console.log(gallery);
    for (let i = 0; i < gallery.length; i++) {
        place.append(
            `
            <div class="var-photo">
                    <img src="${gallery[i]}">
            </div>
            `
        );
    }
}

function setRating(place, rate, sold) {
    // 5 Sold | <span class="stars">⋆⋆⋆⋆</span>
    console.log(sold);
    var r = "";
    for (var i = 0; i < rate; i++) {
        r += "⋆";
    }
    place.append(
        `
        ${sold.toString()} Sold | <span class="stars">${r}</span>
        `
    )
}

function createVariation(place, variation) {
    // console.log(variation);
    if (variation.length == 0) {
        place.append(
            `
            <h3>None</h3>
            `);
    } else {
        for (let i = 0; i < variation.length; i++) {
            place.append(`
                    <div class="variation-select">
                    <span>▼</span>
                    <select>
                    </select>
                    </div>
            `);
            for (let j = 0; j < variation[i].length; j++) {
                var sel = $('.variation-select').eq(i).children('select');
                sel.append(`
                <option value="${variation[i][j]}">${variation[i][j]}</option>
                `);
            }
        }
    }

}


function addQty(item) {
    var qty = $('.quantity').text();
    qty = parseInt(qty, 10);
    qty += 1;
    $('.quantity').text(qty.toString());
    item.qty = qty;
    localStorage.setItem('view', JSON.stringify(item));
}

function minQty(item) {
    var qty = $('.quantity').text();
    qty = parseInt(qty, 10);
    if (qty == 1) {
        qty = 1;
    } else {
        qty -= 1;
    }
    $('.quantity').text(qty.toString());
    item.qty = qty;
    localStorage.setItem('view', JSON.stringify(item));
}


function getItemCart() {
    let cart;
    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', '[]');
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    var cartHolder = $('.shopping-cart');
    if (cart.length == 0) {
        cartHolder.append(`
            <h1>No Items Yet</h1>
        `);
    } else {
        cartHolder.remove("h1");
        for (let x = 0; x < cart.length; x++) {
            cartHolder.append(
                `
                <div class="cart-item">
                <div class="item-desc">
                    <input type="checkbox" name="select" class="sel">
                    <div class="item-pic"><img src="${cart[x].gallery[0]}"></div>
                    <div class="cart-item-name">${cart[x].name}</div>
                </div>
                <div class="unit-price">₱${cart[x].price}</div>
                <div class="unit-quantity">
                    <div class="q-button">
                        <button class="op minus-cart">-</button>
                        <div class="quantity">${cart[x].qty}</div>
                        <button class="op plus-cart">+</button>
                    </div>
                </div>
                <div class="total-price">₱${cart[x].price*cart[x].qty}</div>
                <div class="remove">Delete</div>
            </div>
                `
            );
        }
    }
    $('.plus-cart').click(function() {
        item = cart[$(this).parent().parent().parent().index()]
        item.qty += 1;
        // $('.quantity').text(item.qty);
        // $('.total-price').text(`₱${item.price*item.qty}`);
        $('.cart-item').eq($(this).parent().parent().parent().index()).find('.quantity').text(item.qty);
        $('.cart-item').eq($(this).parent().parent().parent().index()).find('.total-price').text(`₱${item.price*item.qty}`);
        items = JSON.parse(localStorage.getItem('cart'));
        items[$(this).parent().parent().parent().index()] = item;
        localStorage.setItem('cart', JSON.stringify(items));
        collectOrder();
    });
    $('.minus-cart').click(function() {
        item = cart[$(this).parent().parent().parent().index()]
        if (item.qty == 1) {
            item.qty = 1;
        } else {
            item.qty -= 1;
        }
        // $('.quantity').text(item.qty);
        // $('.total-price').text(`₱${item.price*item.qty}`);
        $('.cart-item').eq($(this).parent().parent().parent().index()).find('.quantity').text(item.qty);
        $('.cart-item').eq($(this).parent().parent().parent().index()).find('.total-price').text(`₱${item.price*item.qty}`);
        items = JSON.parse(localStorage.getItem('cart'));
        items[$(this).parent().parent().parent().index()] = item;
        localStorage.setItem('cart', JSON.stringify(items));
        collectOrder();
    });

    $('input[name="select"').click(function() {
        collectOrder();
    });

    $('.remove').click(function() {
        deleteItem($(this).parent().index());
    });
}


$('#select-all').click(function() {
    if ($(this).is(":checked")) {
        checkAllItems();
    } else {
        uncheckAllItems();
    }
    collectOrder();
});

function deleteItem(index) {
    console.log($('.cart-item').eq(index));
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    $('.cart-item').eq(index).slideUp("slow");
    setTimeout(function() {
        $('.cart-item').eq(index).remove();
        localStorage.setItem('cart', JSON.stringify(cart));
        collectOrder();
    }, 800);

}

function checkAllItems() {
    var items = $('.cart-item');
    items.find($('input[name="select"]').prop("checked", true));
}

function uncheckAllItems() {
    var items = $('.cart-item');
    items.find($('input[name="select"]').prop("checked", false));
}


function collectOrder() {
    cart = JSON.parse(localStorage.getItem('cart'));
    n_cart = [];
    order = [];
    items = $('.cart-item');
    total = 0;
    for (let x = 0; x < items.length; x++) {
        if (items.eq(x).find($('input[name="select"]')).is(":checked")) {
            cart[x].mark = "c";
            order.push(cart[x]);
            total += (cart[x].qty * cart[x].price);
        } else {
            cart[x].mark = "f";
        }
        n_cart.push(cart[x]);
    }
    localStorage.setItem('cart', JSON.stringify(n_cart));
    setOrder(order);
    $('.sub-total').text(`₱${total}`);
}

function setOrder(order) {
    if (localStorage.getItem('order') === null) {
        localStorage.setItem('order', '[]');
    }
    localStorage.setItem('order', JSON.stringify(order));
}

//Profile

function getProfile() {
    var infos = $('.infos input');
    for (var x = 0; x < infos.length; x++) {
        var value = $(infos[x]).val();
        var name = $(infos[x]).attr('name');
        if (localStorage.getItem(name) === null) {
            localStorage.setItem(name, JSON.stringify(value));
        }
        var new_val = localStorage.getItem(name);
        $(infos[x]).attr('value', JSON.parse(new_val));
    }
    $('.username').text(`${JSON.parse(localStorage.getItem('username'))}`);
    $('.profile-container').siblings().slideUp("slow").hide();
    $('.profile-container').slideDown("slow");
}

function getBanksAndCredits() {
    let cardsArr;
    $('.bank-container').siblings().slideUp("slow").hide();
    $('.bank-container').slideDown("slow");
    if (localStorage.getItem('cards') === null) {
        localStorage.setItem('cards', '[]');
        cardsArr = JSON.parse(localStorage.getItem('cards'));
    } else {
        cardsArr = JSON.parse(localStorage.getItem('cards'));
    }
    $('.cc-cards').remove();
    if (cardsArr != 0) {
        let card;
        for (let x = 0; x < cardsArr.length; x++) {
            card = cardsArr[x];
            $('.cc').append(
                `
                <div class="cc-cards">
                <div class="credit-container">
                    <div class="credit-logo">
                        <img src="${card.img}">
                    </div>
                    <div class="credit-card-number">
                       ${card.number}
                    </div>
                    <div class="credit-card-month">
                        ${card.month}
                    </div>
                    <div class="credit-card-year">
                        ${card.year}
                    </div>
                    <div class="credit-name">
                        ${card.name}
                    </div>
                    <div class="remove-card">
                        Remove
                    </div>
                </div>
            </div>
                `
            );
        }
    }
    $('.remove-card').click(function() {
        var indexCard = ($(this).parent().parent().index() - 1);
        deleteCard(indexCard);
    });
}

function deleteCard(index) {
    var creditCards = JSON.parse(localStorage.getItem('cards'));
    var itemCard = $('.cc-cards');
    creditCards.splice(index, 1);
    itemCard.eq(index).remove();
    localStorage.setItem('cards', JSON.stringify(creditCards));
}

$('.checkout').click(
    function() {
        collectOrder();
        checkOut();
    }
);
if (localStorage.getItem('cards') === null) {
    localStorage.setItem('cards', '[]');
}

function checkOut() {
    orderID = Math.floor(Math.random() * 10000) + 1001;
    let orders;
    var nameInfo = JSON.parse(localStorage.getItem('name'));
    var contact = JSON.parse(localStorage.getItem('phone'));
    var address = JSON.parse(localStorage.getItem('address'));
    var t = 100;
    cards = JSON.parse(localStorage.getItem('cards'));
    orders = JSON.parse(localStorage.getItem('order'));
    var selection = $('.sel select').val();
    console.log(orders);
    if (orders.length == 0) {
        alert('No items was selected to check out');
    } else {
        $('.op-card').remove();
        $('.package-item').remove();
        for (let z = 0; z < orders.length; z++) {
            t += (orders[z].qty * orders[z].price)
            $('.packages').append(
                `
                <div class="package-item">
                        <img src="${orders[z].image}">
                        <div class="package-title">
                            ${orders[z].name}
                        </div>
                        <div class="package-price">
                            Price : ₱${orders[z].price}
                        </div>
                        <div class="package-qty">
                            Qty : ${orders[z].qty}
                        </div>
                        <div class="package-total">
                            Total: ₱${orders[z].qty*orders[z].price}
                        </div>
                    </div>
                `
            );
        }
        $('.t-price').text(`Total Price : ₱${t}`);
        $('.total-items').text(`Total Item/s : ${orders.length}`);
        $('.p-method').text(`Payment Method: ${selection}`);
        $('input[name="n"]').attr('value', nameInfo);
        $('input[name="c"]').attr('value', contact);
        $('input[name="a"]').attr('value', address);
        $('.order-id').text(`${orderID}`);

        if (selection == "Credit Card") {
            if (cards.length === 0) {
                $('.cc-modal').show().addClass('cc-modal-show').css('display', 'flex').css('z-index', '2');
                showDialog();
            } else {
                $('.item-head').append(
                    ` 
                <div class="op-card">
                    <div class="v-card"><img src="${cards[0].img}">${cards[0].number}</div>
                    <span class="change">change</span>
                    <div class="modal-card"></div>
                </div>
                `
                );
                for (let x = 0; x < cards.length; x++) {
                    $('.modal-card').append(
                        `
                        <div class="m-card"><img src="${cards[x].img}"> ${cards[x].number}</div>
                        `
                    );
                }
                $('.check-out-modal').show().addClass('check-out-show').css('display', 'flex').css('z-index', '2');
                showDialog();
                $('.change').click(
                    function() {
                        $('.modal-card').toggleClass("modal-card-show");
                    }
                );

                $('.m-card').click(
                    function() {
                        $('.v-card').html(`<img src="${cards[$(this).index()].img}">${cards[$(this).index()].number}`)
                        $('.modal-card').toggleClass('modal-card-show');
                    }
                );
            }
        } else {
            $('.check-out-modal').show().addClass('check-out-show').css('display', 'flex').css('z-index', '2');
            showDialog();
        }
    }
}


$('.check-cancel').click(function() {
    $('.check-out-modal').slideUp('slow');
    closeDialog();
});

$('.check-confirm').click(
    function() {
        select = $('.sel select').val();
        let confirmOrders;
        let orders = JSON.parse(localStorage.getItem('order'));
        if (localStorage.getItem('con-order') === null) {
            localStorage.setItem('con-order', '[]');
            confirmOrders = JSON.parse(localStorage.getItem('con-order'));
        } else {
            confirmOrders = JSON.parse(localStorage.getItem('con-order'));
        }
        orders.forEach(order => {
            if (select == "Credit Card") {
                order.proc = "Paid";
            }
            order.id = parseInt($('.order-id').text());
            confirmOrders.push(order);
        });
        deleteConfirmedItems();
        localStorage.setItem('con-order', JSON.stringify(confirmOrders));
        $('.check-out-modal').slideUp('slow');
        closeDialog();
        alert('Items Confirmed');
    }
);

function deleteConfirmedItems() {
    cart = JSON.parse(localStorage.getItem('cart'));
    // items = $('.cart-item');
    for (let j = cart.length - 1; j >= 0; j--) {
        if (cart[j].mark == "c") {
            deleteItem(j);
        }
    }
}

//TODO ---
$('.p-history').click(getPurchase);

function getPurchase() {
    $('.purchase-container').siblings().slideUp("slow").hide();
    $('.purchase-container').slideDown("slow");
    getRecieve();
}

function getRecieve() {
    let recOrders;
    $('.delivered-items').hide();
    $('.to-recieve').slideDown('slow').css('display', 'flex');
    $('.item-recieve').remove();
    if (localStorage.getItem('con-order') === null) {
        localStorage.setItem('con-order', '[]');
    }
    recOrders = JSON.parse(localStorage.getItem('con-order'));
    for (let j = 0; j < recOrders.length; j++) {
        $('.to-recieve').append(`
        <div class="item-recieve">
            <img src=${recOrders[j].image} alt="">
            <div class="r-name">${recOrders[j].name}</div>
            <div class="r-price">Total Price:₱${recOrders[j].qty * recOrders[j].price}</div>
            <div class="r-qty">Qty:${recOrders[j].qty}</div>
            <div class="r-total">${recOrders[j].proc}</div>
            <div class="r-id">OrderId:${recOrders[j].id}</div>
            <div class="r-cancel">Cancel</div>
        </div>
        `);
    }
    $('.r-cancel').click(
        function() {
            let rOrder = JSON.parse(localStorage.getItem('con-order'));
            console.log(rOrder);
            index = $(this).parent().index();
            rOrder.splice(index, 1);
            $('.item-recieve').eq(index).remove();
            localStorage.setItem('con-order', JSON.stringify(rOrder));
        }
    );
}


function getDelivered() {
    $('.to-recieve').hide();
    $('.delivered-items').slideDown('slow').css('display', 'flex');
}

$('.t-recieve').click(function() {
    $(this).addClass('tab-active');
    $(this).siblings().removeClass('tab-active')
    getRecieve();
});
$('.delivered').click(function() {
    $(this).addClass('tab-active');
    $(this).siblings().removeClass('tab-active')
    getDelivered();
});
//TODO----


$('.save-but').click(function() {
    saveProfile();
});


$('.add-cc').click(function() {
    $('.cc-modal').show().addClass('cc-modal-show').css('display', 'flex');
    showDialog();
});



$('input[name="cc-number"]').keyup(ccFormalize);

function ccFormalize() {
    // console.log($(this).val());
    var x = $('input[name="cc-number"]').val();
    x = x.split("-").join("");
    var n = "";
    for (let i = 0; i < x.length; i++) {
        n += x[i];
        if ((i + 1) % 4 == 0 && i != 15) {
            n += "-";
        }
        console.log(n);
    }
    return n;
}

$('.cancel-cc').click(
    function() {
        closeDialog();
        $('.cc-modal').slideUp('slow').hide('slow');
    }
);


function Card(name, number, ccv, month, year, img) {
    this.name = name;
    this.number = number;
    this.ccv = ccv;
    this.month = month;
    this.year = year;
    this.img = img
}

$('.save-cc').click(function() {
    valid = true;
    var inp = $('.cc-form input');
    for (var x = 0; x < inp.length; x++) {
        if ($(inp[x]).val() == "") {
            alert("Please enter value on all fields");
            valid = false
            break;
        }
    }
    if (valid) {
        img = ["./images/cc-img/mastercard.png", "./images/cc-img/visa.jpg"];
        let random = Math.floor(Math.random() * 2);
        let cards = JSON.parse(localStorage.getItem('cards'));
        var name = $('input[name="name-card"]').val();
        var number = ccFormalize();
        var ccv = $('input[name="ccv"]').val();
        var month = $('input[name="cc-month"]').val();
        var year = $('input[name="cc-year"]').val();
        var im = img[random];
        card = new Card(name, number, ccv, month, year, im);
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
        alert('Card Added');
        closeDialog();
        $('.cc-modal').slideUp('slow').hide('slow');
        getBanksAndCredits();
    }
});

function saveProfile() {
    var infos = $('.infos input');

    for (var x = 0; x < infos.length; x++) {
        var name = $(infos[x]).attr('name');
        var value = $(infos[x]).val();
        localStorage.setItem(name, JSON.stringify(value));
    }
    window.location.reload();
}
$('.my-profile').click(function() {
    $(this).siblings().removeClass('tab-active');
    $(this).addClass('tab-active');
    getProfile();
});

$('.b-c').click(function() {
    $(this).siblings().removeClass('tab-active');
    $(this).addClass('tab-active');
    getBanksAndCredits()
});
$('.p-history').click(function() {
    $(this).siblings().removeClass('tab-active');
    $(this).addClass('tab-active');
});


$('.d-t-rate span').mouseover(function() {
    index = $(this).index() + 1;
    $(this).parent().find('span').removeClass('yellow');
    $(this).parent().find(`span:lt(${index})`).addClass('yellow').find(`span:gt(${index})`).removeClass('yellow');
});

$('.d-rate').click(function() {
    $(this).text('Rated').css('background-color', '#866103');
    $(this).parent().find('span').css('pointer-events', 'none');
});

$('.signout-but').click(function() {
    window.location.href = "index.html";
    localStorage.setItem('logIn', 'false');
});


// ----------ADDMIN JS ---------//
function getDashBoard() {
    $('.dash-main').slideDown('slow');
    $('.dash-main').siblings().hide();
    $('.n-order-main').slideDown('slow');
    $('.n-order-main').siblings().hide();
}

function getProduct() {
    $('.products-main').slideDown('slow');
    $('.products-main').siblings().hide();
    getAllProduct();
}

$('.admin-but').click(
    function() {
        window.location.href = "./adminDashboard.html";
    }
);
$('.dashboard').click(function() {
    $(this).addClass('dash-active');
    $(this).siblings().removeClass('dash-active');
    getDashBoard();
});
$('.dash-products').click(function() {
    $(this).addClass('dash-active');
    $(this).siblings().removeClass('dash-active');
    getProduct();
});

$('.n-order-show').click(
    function() {
        console.log($(this))
        $(this).parent().find('.n-order-info').toggleClass('n-show');
    }
);

$('.s-order-show').click(function() {
    $(this).parent().find('.s-order-info').toggleClass('s-show');
})

$('.confirm').click(function() {
    $(this).parent().parent().hide();
    var x = parseInt($('.n-order .m-value').text(), 10);
    x -= 1;
    $('.n-order .m-value').text(x);
});

$('.n-order').click(getDashBoard);

$('.s-order').click(function() {
    $('.s-order-main').slideDown('slow');
    $('.s-order-main').siblings().hide();
});

$('.n-user').click(function() {
    $('.n-user-main').slideDown('slow');
    $('.n-user-main').siblings().hide();
})

$('.select-date').change(function() {
    $('.day-sale span').text($(this).val());
    $('.day-profit span').text($(this).val());
})

/*------------admin products-------*/

allProducts = [
    new Products("BTS - Dynamite Album", "./images/product-image/albums/bts/bts1.jpg", 1200, "album", 250, [], ["./images/product-image/albums/bts/bts1.jpg", "./images/product-image/albums/bts/bts1var/1.jpg", "./images/product-image/albums/bts/bts1var/2.jpg"], 5, 1),
    new Products("BTS - Map of the Soul", "./images/product-image/albums/bts/bts2.jpg", 1300, "album", 250, [], ["./images/product-image/albums/bts/bts2.jpg", "./images/product-image/albums/bts/bts2var/bt1.jpg", "./images/product-image/albums/bts/bts2var/bt2.jpg"], 4, 1),
    new Products("BTS - Wings Album", "./images/product-image/albums/bts/bts3.jpg", 1150, "album", 250, [], ["./images/product-image/albums/bts/bts3.jpg"], 4, 1),
    new Products("Twice- Eyes wide Open", "./images/product-image/albums/twice/twice1.jpg", 1100, "album", 250, [], ["./images/product-image/albums/twice/twice1.jpg", "./images/product-image/albums/twice/twicevar/t2.jpg", "./images/product-image/albums/twice/twicevar/t3.jpg"], 4, 1),
    new Products("Black Pink The Album", "./images/product-image/featured/featured2.jpg", 2350, "album", 150, [], ["./images/product-image/featured/featured2.jpg", "./images/product-image/albums/bp/bpvar/bp1.png"], 5, 1),
    new Products("Black Season Greetings", "./images/product-image/albums/bp/bp1.jpg", 1950, "album", 150, [], ["./images/product-image/albums/bp/bp1.jpg"], 4, 1),
    new Products("Map of of the Soul Hoodie", "./images/product-image/featured/featured4.png", 700, "merchandise", 200, [], ["./images/product-image/featured/featured4.png"], 5, 1),
    new Products("Black Pink Shirt and Short", "./images/product-image/merchandise/bp1.jpg", 950, "merchandise", 200, [], ["./images/product-image/merchandise/bp1.jpg"], 5, 1),
    new Products("BTS - Hoodie", "./images/product-image/merchandise/BTS1.jpg", 750, "merchandise", 200, [], ["./images/product-image/merchandise/BTS1.jpg"], 4, 1),
    new Products("BTS - Mini Bag", "./images/product-image/merchandise/bts2.jpg", 650, "merchandise", 200, [], ["./images/product-image/merchandise/bts2.jpg"], 5, 1),
    new Products("Black Pink The Album Hoodie", "./images/product-image/merchandise/bp3.jpg", 950, "merchandise", 200, [
        ["Black", "Grey", "Pink", "Blue"],
        ["S", "M", "L", "XL", "XS"]
    ], ["./images/product-image/merchandise/bp3var/1.jpg", "./images/product-image/merchandise/bp3var/3.jpg", "./images/product-image/merchandise/bp3var/4.jpg", "./images/product-image/merchandise/bp3var/5.jpg"], 4, 1),
    new Products("Black Pink Cap", "./images/product-image/merchandise/bp2.jpg", 400, "merchandise", 200, [], ["./images/product-image/merchandise/bp2.jpg"], 5, 1),
    new Products("Twice - Mina Photobook", "./images/product-image/photo-book/twice/twice1.png", 550, "photobook", 250, [], ["./images/product-image/photo-book/twice/twice1.png"], 4, 1),
    new Products("Twice - Nayeon Cosmopolitan", "./images/product-image/photo-book/twice/twice2.jpeg", 700, "photobook", 250, [], ["./images/product-image/photo-book/twice/twice2.jpeg"], 5, 1),
    new Products("BTS - Photobook 2020", "./images/product-image/photo-book/bts/bts1.jpg", 300, "photobook", 250, [], ["./images/product-image/photo-book/bts/bts1.jpg"], 5, 1),
    new Products("BTS - Photobook vol.2", "./images/product-image/photo-book/bts/bts2.jpg", 450, "photobook", 250, [], ["./images/product-image/photo-book/bts/bts2.jpg"], 5, 1),
    new Products("Black Pink - Photobook Limited", "./images/product-image/photo-book/bp/bp1.jpg", 550, "photobook", 250, [], ["./images/product-image/photo-book/bp/bp1.jpg"], 4, 1),
    new Products("Black Pink - Photobook Japan Edition", "./images/product-image/photo-book/bp/bp2.jpg", 460, "photobook", 250, [], ["./images/product-image/photo-book/bp/bp2.jpg"], 4, 1),

    new Products("Black Pink -Light Stick", "./images/product-image/featured/featured5.jpg", 1299, "fanlight", 200, [], ["./images/product-image/featured/featured5.jpg"], 5, 1),
    new Products("BTS- Fan Light - Map of the Soul", "./images/product-image/fanlight/bts/bts1.jpg", 2999, "fanlight", 200, [], ["./images/product-image/fanlight/bts/bts1.jpg"], 4, 1),
    new Products("BTS- Fan Light V3", "./images/product-image/fanlight/bts/bts2.jpg", 1599, "fanlight", 200, [], ["./images/product-image/fanlight/bts/bts2.jpg"], 5, 1),
    new Products("Twice- Fan light Candy Bong Z", "./images/product-image/fanlight/twice/twice1.jpg", 1799, "fanlight", 200, [], ["./images/product-image/fanlight/twice/twice1.jpg"], 5, 1),
    new Products("Exo- Fan light V3 ", "./images/product-image/fanlight/exo/exo1.jpg", 1299, "fanlight", 200, [], ["./images/product-image/fanlight/exo/exo1.jpg"], 5, 1),
    new Products("Astro- Fan light V2 ", "./images/product-image/fanlight/astro/astro1.jpg", 1199, "fanlight", 200, [], ["./images/product-image/fanlight/astro/astro1.jpg"], 4, 1),
    new Products("Twice - Tumbler", "./images/product-image/accessories/twice/twice1.png", 799, "accessories", 250, [], ["./images/product-image/accessories/twice/twice1.png"], 5, 1),
    new Products("Twice - Choker", "./images/product-image/accessories/twice/twice2.jpg", 399, "accessories", 250, [], ["./images/product-image/accessories/twice/twice2.jpg", "./images/product-image/merchandise/twice choke/1.png"], 5, 1),
    new Products("Twice - Coin Purse", "./images/product-image/accessories/twice/twice3.jpg", 599, "accessories", 250, [], ["./images/product-image/accessories/twice/twice3.jpg"], 4, 1),
    new Products("Twice - Eyeglass Pouch", "./images/product-image/accessories/twice/twice4.jpg", 799, "accessories", 250, [], ["./images/product-image/accessories/twice/twice4.jpg"], 5, 1),
    new Products("Black Pink - Key chain", "./images/product-image/accessories/bp/bp2.jpg", 199, "accessories", 250, [], ["./images/product-image/accessories/bp/bp2.jpg"], 5, 1),
    new Products("Black Pink - Charger Docker", "./images/product-image/accessories/bp/bp3.jpg", 499, "accessories", 250, [], ["./images/product-image/accessories/bp/bp3.jpg"], 5, 1),
    new Products("BTS - Key Chain", "./images/product-image/accessories/bts/bts1.jpg", 199, "accessories", 250, [], ["./images/product-image/accessories/bts/bts1.jpg"], 5, 1),
    new Products("BTS - Coin Purse", "./images/product-image/accessories/bts/bts2.jpg", 599, "accessories", 250, [
        ["black", "red", "blue", "green", "grey"]
    ], ["./images/product-image/accessories/bts/bts2.jpg", ], 5, 1),

];



$('.v-prod').click(function() {
    $(this).addClass('prod-active');
    $(this).siblings().removeClass('prod-active');
    getAllProduct();
});
$('.add-prod').click(function() {
    $(this).addClass('prod-active');
    $(this).siblings().removeClass('prod-active');
    addProduct();
});

function getAllProduct() {
    // $('.prod-admin-item').remove();
    $('.add-products-main').hide();
    $('.product-admin-main').slideDown('slow');
    // for (let y = 0; y < allProducts.length; y++) {
    //     var it = allProducts[y];
    //     $('.product-admin-main').append(
    //         `
    //                 <div class="prod-admin-item">
    //                     <div class="prod-item">
    //                         <img src="${it.image}">
    //                         <div class="ad-name"><input type="text" value="${it.name}"></div>
    //                         <div class="ad-price">Price ₱: <input type="text" value="${it.price}" name="p"></div>
    //                         <div class="ad-type">Type: <input type="text" value="${it.type}"></div>
    //                         <div class="edit">Edit</div>
    //                         <div class="remove-ad-item">remove</div>
    //                     </div>
    //                     <div class="prod-more-info">
    //                         <div class="ad-stock">Stocks: <input type="number" value="${it.stocks}"></div>
    //                         <div class="vari">Variation:<input type="text" value="None"></div>
    //                         <div class="make-feat">Make Feature <input type="checkbox"></div>
    //                     </div>
    //                 </div>
    //     `);
    // }
    $('.prod-item').click(
        function(e) {
            if (!$(e.target).hasClass('edit') && !$(e.target).hasClass('remove-ad-item')) {
                $(this).parent().find('.prod-more-info').toggleClass('prod-more-show');
            }
        }
    );
    $('.edit').click(function() {
        if (!$('.prod-admin-item input').hasClass('editable')) {
            $('.prod-admin-item input').addClass('editable').css('pointer-events', 'all');
            $(this).text('save');
        } else {
            $('.prod-admin-item input').removeClass('editable').css('pointer-events', 'none');
            $(this).text('edit');
        }
    });

    $('.remove-ad-item').click(function() {
        $(this).parent().parent().hide();
    });
}


function addProduct() {
    $('.product-admin-main').hide();
    $('.add-products-main').slideDown('slow');
}

$('.en-submit').click(function() {
    alert('1 Product Added ');
    window.location.reload();
});


$('.dash-users').click(function() {
    $(this).addClass('dash-active');
    $(this).siblings().removeClass('dash-active');
    getUsers();
});

function getUsers() {
    $('.users-admin').siblings().hide();
    $('.users-admin').slideDown('slow');
}

$('.user-show').click(
    function() {
        $(this).siblings().toggleClass('u-show');
    }
);

$('.user-delete').click(function() {
    var n = parseInt($('.m-box-t span').text());
    n -= 1;
    $('.m-box-t span').text(n);
    $(this).parent().parent().hide();
});

$('.dash-admin').click(function() {
    $(this).siblings().removeClass('dash-active');
    $(this).addClass('dash-active');
    getAdmins();
});

function getAdmins() {
    $('.admins-admin').siblings().hide();
    $('.admins-admin').slideDown('slow');
}

$('.edit-admin').click(function() {
    if (!$(this).parent().find('.a-inpt').hasClass('editable')) {
        $(this).parent().find('.a-inpt').addClass('editable').css('pointer-events', 'all');
        $(this).text('save');
    } else {
        $(this).parent().find('.a-inpt').removeClass('editable').css('pointer-events', 'none');
        $(this).text('edit');
    }

});

// $('.add-admin').click(function() {
//     var user = $('.admins-add input[placeholder="username"]').val()
//     var pass = $('.admins-add input[placeholder="password"]').val()
//     var name = $('.admins-add input[placeholder="name"]').val()
//     var num = parseInt($('.a-box-t span').text());
//     num += 1;
//     $('.admins-body').append(
//         `
//         <div class="admins-item">
//                     <div class="admins-show">
//                             <div class="user-x"">Username: <input type="text" value="${user}" class="a-inpt"></div>
//                             <div class="user-x"">Password:<input type="password" value="${pass}" class="a-inpt"></div>
//                             <div class="user-x"">Name: ${name}</div>
//                             <div class="edit-admin">Edit</div>
//                             <div class="user-delete">Delete</div>
//                     </div>
//         </div>
//         `
//     );
//     $('.a-box-t span').text(num);

// });

$('.user-delete').click(function() {
    var num = parseInt($('.a-box-t span').text());
    num -= 1;
    $('.a-box-t span').text(num);
    $(this).parent().hide();
});

$('.dash-out').click(function() {
    window.location.replace("./adminLogin.html");
});