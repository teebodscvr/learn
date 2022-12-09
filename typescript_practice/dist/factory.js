"use strict";
var HomeType;
(function (HomeType) {
    HomeType["FLAT"] = "Flat";
    HomeType["HOUSE"] = "House";
    HomeType["TOWN_HOUSE"] = "Town house";
})(HomeType || (HomeType = {}));
class Home {
} // Abstract class
class Flat extends Home {
} // Concrete home class
class FlatFactory {
    static create() {
        return new Flat();
    }
}
class HomeFactory {
    static create(homeType) {
        switch (homeType) {
            case HomeType.FLAT:
                return FlatFactory.create(); // ? We did not need to specify the concrete class 'Flat' to create a Flat instance
                break;
            default:
                return null;
        }
    }
}
// ? Create a Flat instance
HomeFactory.create(HomeType.FLAT); // A Flat's/Home's creation is abstracted 
// ? We have
// * Abstracted a homes creation
// * We have delegated the responsibility of a Home's creation to one place (Single Responsibility)
