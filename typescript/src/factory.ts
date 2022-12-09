enum HomeType {
    FLAT = 'Flat',
    HOUSE = 'House',
    TOWN_HOUSE = 'Town house'
}

abstract class Home {} // Abstract class

class Flat extends Home {} // Concrete home class

class FlatFactory { // Factory to create a type on a home instane, flat in this case
    public static create(): Home { // ? Hides a Flat's complex creation logic
        return new Flat();
    }
}

class HomeFactory {
    public static create(homeType: HomeType): Home | null { // * Fatcory method
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

HomeFactory.create(HomeType.FLAT) // A Flat's/Home's creation is abstracted 

// ? We have

// * Abstracted a homes creation
// * We have delegated the responsibility of a Home's creation to one place (Single Responsibility)
