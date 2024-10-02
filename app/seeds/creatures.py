from app.models import db, Creature, environment, SCHEMA
from app.seeds.users import saul, demo, jimmy
from sqlalchemy.sql import text


gryphon = Creature(
    user=demo,
    image="https://cdna.artstation.com/p/assets/images/images/018/991/054/large/paul-canavan-goldmane-griffin.jpg",
    name="Gryphon",
    category="Mythological",
    origin="Greek",
    description="The griffin, griffon, or gryphon is a legendary creature with the body, tail, and back legs of a lion, and the head and wings of an eagle with its talons on the front legs. ",
)

bigfoot = Creature(
    user=jimmy,
    image="https://npr.brightspotcdn.com/dims4/default/87b6d53/2147483647/strip/true/crop/565x348+0+3/resize/880x542!/quality/90/?url=http:%2F%2Fnpr-brightspot.s3.amazonaws.com%2Ff2%2F91%2F76551511422dbcd917680518a583%2Fscreenshot-2023-07-20-235828.png",
    name="Bigfoot",
    category="Cryptid",
    origin="North America",
    description="Bigfoot, also known as Sasquatch, is an ape-like creature purported to inhabit North American forests, often described as large and hairy.",
    saves=[jimmy, saul],
)

chupacabra = Creature(
    user=saul,
    image="https://3.bp.blogspot.com/-dC05slh45F0/VU1XhS7vkSI/AAAAAAABpME/SjGPWiszLkg/s1600/chupacabra21.jpg",
    name="Chupacabra",
    category="Cryptid",
    origin="Puerto Rico",
    description="The Chupacabra is a legendary creature in folklore, known for attacking and drinking the blood of livestock, especially goats. Physical descriptions of the creature vary. In Puerto Rico and in Hispanic America it is generally described as a heavy creature, reptilian and alien-like, roughly the size of a small bear, and with a row of spines reaching from the neck to the base of the tail, while in the Southwestern United States it is depicted as more dog-like.",
    saves=[jimmy],
)

wendigo = Creature(
    user=saul,
    name="Wendigo",
    image="https://wallpaperaccess.com/full/6116106.jpg",
    category="Folklore",
    origin="Algonquian Tribes",
    description="In Algonquian folklore, the Wendigo is a malevolent spirit associated with winter, starvation, and greed, often depicted as a cannibalistic monster.",
)

slender_man = Creature(
    user=demo,
    image="https://getwallpapers.com/wallpaper/full/5/3/e/65692.jpg",
    name="Slender Man",
    category="Creepypasta",
    origin="Internet",
    description="Slender Man is a fictional supernatural character that originated as an Internet meme, depicted as a tall, faceless figure in a suit who stalks and abducts people.",
    saves=[jimmy, saul],
)

kraken = Creature(
    user=jimmy,
    name="Kraken",
    image="https://img.freepik.com/premium-photo/octopus-kraken-monster-rising-from-depths-with-its-eight-tentacles-ready-prey_124507-140982.jpg",
    category="Folklore",
    origin="Scandinavian",
    description="The Kraken is a legendary sea monster that is said to dwell off the coasts of Norway and Greenland, often depicted as a giant octopus or squid.",
)

banshee = Creature(
    user=demo,
    name="Banshee",
    image="https://upload.wikimedia.org/wikipedia/commons/8/89/Banshee.jpg",
    category="Mythological",
    origin="Ireland",
    description="In Irish folklore, a Banshee is a wailing female spirit that heralds the death of a family member, often depicted as a pale woman in white.",
    saves=[saul],
)

siren = Creature(
    user=demo,
    name="Siren",
    image="https://i.pinimg.com/736x/60/43/65/604365a62e600773a7112deabd76b1a9--ancient-aliens-ancient-greek.jpg",
    category="Mythological",
    origin="Ancient Greece",
    description="Sirens are creatures from Greek mythology that lure sailors to their doom with enchanting music and voices, often depicted as half-woman, half-bird.",
    saves=[saul],
)

mothman = Creature(
    user=demo,
    name="Mothman",
    image="https://urbanlegendsonline.com/wp-content/uploads/2012/08/mothman.jpg",
    category="Cryptid",
    origin="West Virginia, USA",
    description="Mothman is a creature reportedly seen in Point Pleasant, West Virginia, often described as a large humanoid with wings and glowing red eyes.",
)

gorgon = Creature(
    user=demo,
    name="Gorgon",
    image="https://mythlok.com/wp-content/uploads/2024/03/gorgons-greek-mythological-creatures.jpg",
    category="Mythological",
    origin="Ancient Greece",
    description="Gorgons are monstrous female figures in Greek mythology, dread monsters with terrifying eyes and hair made of snakes and the ability to turn anyone who looks at them to stone. Stheno, Euryale, and Medusa, said to be the daughters of Phorcys and Ceto.",
    saves=[jimmy, saul],
)

skin_walker = Creature(
    user=jimmy,
    name="Skinwalker",
    image="https://www.trendzified.net/wp-content/uploads/2021/10/skin-walker-tik-tok1.jpg",
    category="Folklore",
    origin="Navajo Culture",
    description="A Skinwalker is a type of harmful witch in Navajo culture, believed to have the ability to shapeshift into various animals.",
)

scp_173 = Creature(
    user=demo,
    name="SCP-173",
    image="https://cdna.artstation.com/p/marketplace/presentation_assets/001/785/880/large/file.jpg",
    category="SCP",
    origin="SCP Foundation",
    description="Moved to Site-19 1993. Origin is as of yet unknown. It is constructed from concrete and rebar with traces of Krylon brand spray paint. SCP-173 is animate and extremely hostile. The object cannot move while within a direct line of sight. Line of sight must not be broken at any time with SCP-173. Personnel assigned to enter container are instructed to alert one another before blinking. Object is reported to attack by snapping the neck at the base of the skull, or by strangulation. In the event of an attack, personnel are to observe Class 4 hazardous object containment procedures. Personnel report sounds of scraping stone originating from within the container when no one is present inside. This is considered normal, and any change in this behaviour should be reported to the acting HMCL supervisor on duty.",
)

doppelganger = Creature(
    user=jimmy,
    name="Doppelganger",
    image="https://i.pinimg.com/474x/76/07/06/7607067ca0da52fc09bdae8250c1cb59--rossetti-gabriel.jpg",
    category="Folklore",
    origin="Germany",
    description="A doppelganger is a non-biologically related look-alike or double of a living person, often considered an omen of bad luck.",
)

cerberus = Creature(
    user=demo,
    name="Cerberus",
    image="https://www.greekboston.com/wp-content/uploads/2020/03/cerberus-scaled.jpg",
    category="Mythological",
    origin="Ancient Greece",
    description="Cerberus is the three-headed dog that guards the gates of the Underworld, preventing the dead from escaping.",
)

yeti = Creature(
    user=demo,
    name="Yeti",
    image="https://vignette.wikia.nocookie.net/cryptidz/images/9/93/Early_yeti.JPG",
    category="Cryptid",
    origin="Himalayan Region",
    description="The Yeti, or Abominable Snowman, is a legendary ape-like creature believed to inhabit the Himalayan mountains.",
)

fomorian = Creature(
    user=demo,
    name="Fomorian",
    image="https://www.ancient-origins.net/sites/default/files/field/image/Fomorians.jpg",
    category="Mythological",
    origin="Ireland",
    description="Fomorians are a race of sea-dwelling giants in Irish mythology, often depicted as monstrous beings that oppose the Tuatha Dé Danann, gods and heroes of the first settlers of Ireland.",
)

the_rake = Creature(
    user=demo,
    name="The Rake",
    image="http://img4.wikia.nocookie.net/__cb20110209040717/creepypasta/images/0/04/The_Rake.jpg",
    category="Creepypasta",
    origin="Internet",
    description="The Rake is a humanoid creature in creepypasta lore, described as a pale, emaciated figure that stalks and terrorizes its victims. Little or no information was left intact, as most online and written accounts of the creature were mysteriously destroyed.",
    saves=[jimmy, saul],
)

kappa = Creature(
    user=demo,
    name="Kappa",
    image="https://espunisinjapan.com/wp-content/uploads/2023/12/kappa-1024x1024.jpg",
    category="Mythological",
    origin="Japan",
    description="Kappa are river monsters in Japanese folklore, often depicted as humanoid beings with a dish on their heads that holds water, making them powerful but mischievous.",
    saves=[jimmy],
)

vampire = Creature(
    user=jimmy,
    name="Vampire",
    image="https://art.ngfiles.com/images/453000/453100_themanofsteal13_vampire-hunter-d.jpg",
    category="Folklore",
    origin="Eastern Europe",
    description="Vampires are mythical creatures that subsist by feeding on the life essence of the living, typically blood, often characterized by immortality. Often depicted as a pale, elegant figure with sharp fangs, possessing supernatural abilities such as enhanced strength, agility, and immortality, vampires return to prey on the living using methods of terror and supernatural curses.",
    saves=[jimmy, saul],
)

scp_682 = Creature(
    user=demo,
    name="SCP-682",
    image="https://i.kym-cdn.com/photos/images/original/001/893/861/f03.jpg",
    category="SCP",
    origin="SCP Foundation",
    description="SCP-682 is a large, vaguely reptile-like creature of unknown origin. It appears to be extremely intelligent, and was observed to engage in complex communication with SCP-079 during their limited time of exposure. SCP-682 appears to have a hatred of all life, which has been expressed in several interviews during containment. SCP-682 has always been observed to have extremely high strength, speed, and reflexes, though exact levels vary with its form. SCP-682's physical body grows and changes very quickly, growing or decreasing in size as it consumes or sheds material. SCP-682 gains energy from anything it ingests, organic or inorganic. Digestion seems to be aided by a set of filtering gills inside of SCP-682 nostrils, which are able to remove usable matter from any liquid solution, enabling it to constantly regenerate from the acid it is contained in. SCP-682s regenerative capabilities and resilience are staggering, and SCP-682 has been seen moving and speaking with its body 87% destroyed or rotted.",
    saves=[saul],
)


def seed_creatures():
    creatures = [
        gryphon,
        kappa,
        vampire,
        scp_682,
        the_rake,
        scp_173,
        fomorian,
        yeti,
        cerberus,
        doppelganger,
        skin_walker,
        gorgon,
        mothman,
        siren,
        banshee,
        kraken,
        slender_man,
        wendigo,
        chupacabra,
        bigfoot
    ]

    for creature in creatures:
        db.session.add(creature)
    db.session.commit()


def undo_creatures():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.creatures RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM creatures"))

    db.session.commit()
