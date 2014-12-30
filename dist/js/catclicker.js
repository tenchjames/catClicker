(function() {
    var catPictures = document.getElementById('catPictures'),
        catImages = [];
    
    var incrementClickCount = function(catName) {
        return function() {
            var catElement = document.getElementById(catName + 'Count'),
            totalClicks;
            totalClicks = parseInt(catElement.innerHTML, 10);
            totalClicks += 1;
            catElement.innerHTML = totalClicks.toString();             
        };
    };
    
    var cat = {name: "cat", src: "img/cat.jpg"},
        kitten = {name: "kitty", src: "img/kitty.jpg"};

    catImages.push(cat);
    catImages.push(kitten);

    var catPicturesFragement = document.createDocumentFragment(),
        catImageElement,
        catNameElement,
        catCountElement,
        catImage,
        catName;

    for (var i = 0; i < catImages.length; i += 1) {
        catImageElement = document.createElement('img');
        catImageElement.src = catImages[i].src;
        catImageElement.alt = catImages[i].name;
        catImageElement.id = catImages[i].name + 'Img';
        catNameElement = document.createElement('p');
        catNameElement.appendChild(document.createTextNode(catImages[i].name + ' Click Count: '));
        catCountElement = document.createElement('span');
        catCountElement.id = catImages[i].name + 'Count';
        catCountElement.appendChild(document.createTextNode('0'));
        catNameElement.appendChild(catCountElement);

        catPicturesFragement.appendChild(catNameElement);
        catPicturesFragement.appendChild(catImageElement);

    }
    catPictures.appendChild(catPicturesFragement);

    for (i = 0; i < catImages.length; i += 1) {
        catImage = catImages[i];
        catName = catImage.name;
        catImageElement = document.getElementById(catName + 'Img');
        catImageElement.addEventListener('click',
                incrementClickCount(catName)); 
    }
    
})();