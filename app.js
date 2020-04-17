$(document).ready(function () {

    //Split products into 3 sets
    var productSet1 = [];
    var productSet2 = [];
    var productSet3 = [];
    var numItems = Math.floor(products.length / 3);

    var remainder = products.length % 3;

    if (remainder === 1) {
        productSet1[0] = products[0];
    }

    if (remainder === 2) {
        productSet1[0] = products[0];
        productSet2[0] = products[1];
    }

    for (var i = remainder; i < numItems + remainder; i++) {

        productSet1.push(products[i]);
        productSet2.push(products[i + numItems]);
        productSet3.push(products[i + numItems * 2]);
    }

    //Render product sliders
    renderProducts(productSet1, '#product-container-1');
    renderProducts(productSet2, '#product-container-2');
    renderProducts(productSet3, '#product-container-3');

    function renderProducts(products, containerId) {
        //Set data and display
        products.forEach(product => {
            var productContainer = $(containerId);
            productContainer.append(
                "<div class='product'>"
                + "<img class='product-image' src='" + product.imageS + "'/>"
                + "<div class='info-container'>"
                    + (getProductDiscount(product) ? "<div class='product-discount info-item'>" + getProductDiscount(product) + "</div>" : "")
                    + (product.params.isNew === "true" ? "<div class='product-isNew info-item'>NEU</div>" : "")
                    + (product.params.likeCount.length ? "<div class='product-likeCount info-item'>" + "<i class='far fa-heart'></i> " + product.params.likeCount + "</div>" : "")
                + "</div>"
                + "<div class='product-name'>" + product.name + "</div>"
                + "<div class='props'>"
                    + (product.params.land.length ? "<div class='product-land'>" + product.params.land + "&nbsp" + "|" + "&nbsp" + "</div>" : "")
                    + (product.params.region ? "<div class='product-region'>" + product.params.region + "&nbsp" + "|" + "&nbsp" + "</div>" : "")
                    + (product.params.art ? "<div class='product-art'>" + product.params.art + "</div>" : "")
                + "</div>"
                + "<div class='price'>"
                    + "<div class='product-price'>" + product.price.toFixed(2) + " €*" + "</div>"
                    + (product.oldPrice ? "<div class='product-oldPrice'>" + product.oldPrice.toFixed(2) + " €*" + "</div>" : "")
                + "</div>"
                + "<div class='product-basePrice'>" + product.params.basePrice + "</div>"
                + "</div>"
            )
        });
    }

    // calculate discount
    function getProductDiscount(product) {
        var discount;

        if (product.oldPrice) {
            discount = "-" + Math.round(((product.oldPrice / product.price) - 1) * 100) + "%";
        }
        return discount;
    }

    // widget 1,2,3
    $('#product-container-1, #product-container-2, #product-container-3').slick({
        slidesToShow: 5,
        slidesToScroll: 1,        
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});