(function() {
    var catPicture = document.getElementById('catPicture'),
        catList = document.getElementById('catList'),
        catImages = [],
        i;
    
    var incrementClickCount = function(catName) {
        return function() {
            var catElement = document.getElementById(catName + 'Count');
            var cat = findCatIndexByName(catName);
            catImages[cat].totalClicks += 1;
            catElement.innerHTML = catImages[cat].totalClicks.toString();        
        };
    };
    
    var cat = {name: "cat", src: "img/cat.jpg"},
        kitten = {name: "kitty", src: "img/kitty.jpg"},
        jinxy = {name: "jinxy", src: "img/jinxy.jpg"},
        cutie = {name: "cutie", src: "img/cutie.jpg"};

    var addCatImage = function(cat) {
        cat.totalClicks = 0;
        cat.domImage = document.createElement('img');
        cat.domImage.src = cat.src;
        cat.domImage.id = cat.name;
        cat.domImage.addEventListener('click',
            incrementClickCount(cat.name), false);
        catImages.push(cat);
    };

    var findCatIndexByName = function(catName) {
        for (i = 0; i < nCatImages; i += 1) {
            if (catImages[i].name === catName) {
                return i;
            }
        }
        return -1;
    };

    var swapCatImage = function(newCat) {
        return function() {
            while (catPicture.firstChild) {
                catPicture.removeChild(catPicture.firstChild);
            }
            catPicture.appendChild(createCatImage(newCat));            
        };
    };

    addCatImage(cat);
    addCatImage(kitten);
    addCatImage(jinxy);
    addCatImage(cutie);

    var catListFragment = document.createDocumentFragment(),
        catUlElement,
        catLiElement,
        nCatImages = catImages.length;

    if (nCatImages > 0) {
        catUlElement = document.createElement('ul');
        catUlElement.className = 'kittenList';

        for (i = 0; i < nCatImages; i += 1) {
            catLiElement = document.createElement('li');
            catLiElement.className = 'kittenListItem';
            catLiElement.id = catImages[i].name + 'ListItem';
            catLiElement.innerHTML = catImages[i].name;
            catLiElement.addEventListener('click', 
                swapCatImage(catImages[i]), false);
            catUlElement.appendChild(catLiElement);
        }
        catListFragment.appendChild(catUlElement);
        catList.appendChild(catListFragment);
    }



    var createCatImage = function(cat) {
        var catPicturesFragement = document.createDocumentFragment(),
            catNameElement,
            catCountElement,
            catName;       

        catNameElement = document.createElement('p');
        catNameElement.appendChild(document.createTextNode(cat.name + ' Click Count: '));
        catCountElement = document.createElement('span');
        catCountElement.id = cat.name + 'Count';
        catCountElement.appendChild(document.createTextNode(cat.totalClicks));
        catNameElement.appendChild(catCountElement);

        catPicturesFragement.appendChild(catNameElement);
        catPicturesFragement.appendChild(cat.domImage);
        return catPicturesFragement;    
    };

    catPicture.appendChild(createCatImage(catImages[0]));
    
})();