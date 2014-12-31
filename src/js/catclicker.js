(function() {
    var model = {
        currentCat: null,
        cats: [
            {name: "zed", src: "img/cat.jpg", clicks: 0},
            {name: "furry", src: "img/kitty.jpg", clicks: 0},
            {name: "jinxy", src: "img/jinxy.jpg", clicks: 0},
            {name: "cutie", src: "img/cutie.jpg", clicks: 0}
        ],
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify(this.cats);
            }
        },

        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            this.cats.push(obj);
            localStorage.cats = JSON.stringify(this.cats);
        },

        updateCurrentCat: function(cat) {
            this.currentCat.name = cat.name;
            this.currentCat.src = cat.src;
            this.currentCat.clicks = cat.clicks;
        },

        getAllCats: function() {
            return this.cats;
        }
    };

    var octopus = {
        init: function() {
            model.init();
            model.currentCat = model.cats[0];

            viewCatList.init();
            viewCatPicture.init();
            viewAdminArea.init();
        },

        getCats: function() {
            return model.getAllCats();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        swapCat: function(cat) {
            model.currentCat = cat;
            viewAdminArea.render();
        },

        incrementClickCount: function() {
            model.currentCat.clicks += 1;
            viewCatPicture.render();
            viewAdminArea.render();
        },

        updateCurrentCat: function(cat) {
            model.updateCurrentCat(cat);
            viewCatPicture.render();
            viewAdminArea.render();
        }
    };

    var viewCatPicture = {
        init: function() {
            this.catNameElement = document.getElementById('cat-name');
            this.catPictureElement = document.getElementById('catPicture');
            this.catCountElement = document.getElementById('cat-count');
            this.catImageElement = document.getElementById('cat-img');

            this.catImageElement.addEventListener('click', function(e) {
                octopus.incrementClickCount();
            });

            this.render();
        },

        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catNameElement.textContent = currentCat.name;
            this.catCountElement.textContent = currentCat.clicks;
            this.catImageElement.src = currentCat.src;
        }
    };

    var viewCatList = {
        init: function() {
            this.catList = document.getElementById('kittenList');
            this.render();
        },

        render: function () {
            var catListFragment = document.createDocumentFragment(),
                catLiElement,
                cats = octopus.getCats(),
                nCats = cats.length;

            for (i = 0; i < nCats; i += 1) {
                catLiElement = document.createElement('li');
                catLiElement.className = 'kittenListItem';
                catLiElement.id = cats[i].name + 'ListItem';
                catLiElement.innerHTML = cats[i].name;
                catLiElement.addEventListener('click', 
                    this.attachEventListenter(cats[i]), false);
                catListFragment.appendChild(catLiElement);
            }
            while(this.catList.firstChild) {
                this.catList.removeChild(this.catList.firstChild);
            }
            this.catList.appendChild(catListFragment);
        },
        attachEventListenter: function(cat) {
            return function() {
                octopus.swapCat(cat);
                viewCatPicture.render();
            };
        }
    };

    var viewAdminArea = {
        init: function() {
            this.adminArea = document.getElementById('adminArea');
            this.adminButton = document.getElementById('adminBtn');
            this.adminVisible = false;
            this.cancelButton = document.getElementById('cancelBtn');
            this.submitButton = document.getElementById('submitBtn');
            me = this;

            this.adminButton.addEventListener('click', function(e) {
                if (!me.adminVisible) {
                    me.adminVisible = true;
                    me.render();
                }
                e.preventDefault();
            }, false);

            this.cancelButton.addEventListener('click', function(e) {
                if (me.adminVisible) {
                    me.adminVisible = false;
                    me.render();
                }
                e.preventDefault();
            }, false);

            this.submitButton.addEventListener('click', function(e) {
                var cat = {};
                cat.name = document.getElementById('catNameInput').value;
                cat.src = document.getElementById('catURLInput').value;
                cat.clicks = parseInt(document.getElementById('catClicksInput').value, 10);
                octopus.updateCurrentCat(cat);
                e.preventDefault();
            }, false);          

            this.render();
        },

        render: function() {
            var currentCat = octopus.getCurrentCat();
            var catNameInput = document.getElementById('catNameInput');
            var catURLInput = document.getElementById('catURLInput');
            var catClicksInput = document.getElementById('catClicksInput');
            if (this.adminVisible) {
                catNameInput.value = currentCat.name;
                catURLInput.value = currentCat.src;
                catClicksInput.value = currentCat.clicks;
                this.adminArea.className = "show";
            } else {
                this.adminArea.className = "hidden";
            }
        }
    };

    octopus.init();
})();