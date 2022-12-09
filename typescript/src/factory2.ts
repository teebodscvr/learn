enum HeroType {
    BRAVE = 'Brave',
    FUNNY = 'Funny',
    COMPASSIONATE = 'Compassionate',
}

class SuperPower {
    constructor(private intensity: 'strong' | 'weak', private type: 'fire' | 'water'){}

    getIntensity(): string {
        return this.intensity;
    }

    getSuperPowerType(): string {
        return this.type;
    }
}

abstract class Hero {
    abstract saveHumanity(): string; // Abstracted method
} // Abstract class


// * BRAVE HERO
class BraveHero extends Hero {
    constructor(private superPower: SuperPower){
        super();
    }

    saveHumanity(): string {
        return 'I save humans by being brave'; // implement the common method to all heroes
    }

    demoPower(): void {
        console.log(this.superPower.getSuperPowerType());
    }
} // Concrete hero class

class BraveHeroFactory { // Factory to create a type of a hero instane, BraveHero in this case
    public static create(): Hero { // ? Hides a BraveHero's complex creation logic
        const superPower = new SuperPower('strong', 'water');

        return new BraveHero(superPower);
    }
}


// * FUNNY HERO
class FunnyHero extends Hero {
    saveHumanity(): string {
        return 'I save humans by being funny'; // implement the common method to all heroes
    }
} // Concrete hero class

class FunnyHeroFactory { // Factory to create a type of a hero instane, FunnyHero in this case
    // This is where you would utilize any external dependencies to the creation of a hero.
    // For example each hero is made up of a custome and has some other distinct attributes from other heroes
    public static create(): Hero { // ? Hides a FunnyHero's complex creation logic
        return new FunnyHero();
    }
}


class HeroFactory {
    public static create(heroType: HeroType): Hero | null { // * Factory method
        switch (heroType) {
            case HeroType.BRAVE:
                return BraveHeroFactory.create(); // ? We did not need to specify the concrete class 'BraveHero' to create a BraveHero instance
            case HeroType.FUNNY:
                return FunnyHeroFactory.create(); // ? We did not need to specify the concrete class 'FunnyHero' to create a FunnyHero instance
            default:
                return null;
        }
    }
}

// ? Create a Hero instance

const braveHero = HeroFactory.create(HeroType.BRAVE) // A Hero's's creation is abstracted 
const funnyHero = HeroFactory.create(HeroType.FUNNY) // A Hero's's creation is abstracted 

console.log(braveHero?.saveHumanity());

console.log(funnyHero?.saveHumanity());

// ? We have

// * Abstracted a hero's creation
// * We have delegated the responsibility of a Hero's creation to one place (Single Responsibility)
