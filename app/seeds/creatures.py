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
    description="SCP-173 was relocated to Site-19 in 1993, with its origin unknown. Constructed from concrete and rebar, it has traces of Krylon spray paint. The entity is animate and highly hostile, capable of movement only when not in direct line of sight. Personnel must maintain eye contact and alert each other before blinking. SCP-173 attacks by snapping necks or strangulation. In the event of an attack, staff should follow Class 4 hazardous containment procedures.",
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
    description="SCP-682 is a large, vaguely reptile-like creature of unknown origin. It appears to be extremely intelligent, and was observed to engage in complex communication with SCP-079 during their limited time of exposure. SCP-682 appears to have a hatred of all life, which has been expressed in several interviews during containment. SCP-682 has always been observed to have extremely high strength, speed, and reflexes, though exact levels vary with its form.",
    saves=[saul],
)

thunderbird = Creature(
    user=jimmy,
    name="Thunderbird",
    image="https://i.pinimg.com/originals/c5/3c/03/c53c03f8dee57461def2db723fde0434.jpg",
    category="Folklore",
    origin="North America",
    description="The Thunderbird is a large bird-like spirit in North American indigenous peoples' history. The thunderbird is said to create thunder by flapping its wings and lightning by flashing its eyes, according to Algonquian and Iroquois traditions. Across different cultures, thunderbirds are typically depicted as birds of prey or as hybrids of humans and birds. They are often seen as protectors, sometimes intervening on behalf of people, but they expect veneration, prayers, and gifts in return.",
    saves=[saul, demo]
)

unicorn = Creature(
    user=saul,
    name="Unicorn",
    image="https://i.etsystatic.com/38122924/r/il/38c679/4388307738/il_1080xN.4388307738_2l6o.jpg",
    category="Other",
    origin="Unknown",
    description="In mythology, a unicorn is simply an animal with a single horn. This single horn is supposed to be on the midline of the body, such as the center of the forehead, and it needs to have grown there naturally. Nearly everyone agrees that a two-horned animal with one horn that broke off or failed to grow is not a unicorn.",
)

scp_049 = Creature(
    user=demo,
    name="SCP-049",
    description="A.K.A. The Plague Doctor, SCP-049 is a humanoid entity resembling a medieval plague doctor, approximately 1.9 meters tall. Its robes and ceramic mask appear to have grown from its body, but X-rays reveal a humanoid skeletal structure beneath. SCP-049 speaks various languages, preferring English or medieval French, and generally cooperates with Foundation staff. However, it becomes hostile towards individuals it perceives as affected by the 'Pestilence,' which is an unknown condition. SCP-049 can cause biological functions to cease through skin contact, often resulting in deaths it finds frustrating. It performs crude surgeries on the deceased using tools from a black doctor's bag, creating SCP-049-2 instances—reanimated corpses lacking prior memories but displaying basic motor functions. These instances can become aggressive if provoked, and SCP-049 claims they have been 'cured.'",
    category="SCP",
    origin="SCP Foundation",
    image="https://media.sketchfab.com/models/fdfe6648076b4573847fd11fb09dc23e/thumbnails/9f83f12c62764aa6815340884398c6e2/700aec50086442f7a394c9e3fe727e96.jpeg",
    saves=[jimmy],
)

baba_yaga = Creature(
    user=jimmy,
    name="Baba Yaga",
    category="Folklore",
    origin="Eastern Europe",
    image="https://ychef.files.bbci.co.uk/976x549/p0dh6lgp.jpg",
    description="Baba Yaga, in Slavic folklore, is an ogress who steals, cooks, and eats her victims, usually children. A guardian of the fountains of the water of life, she lives with two or three sisters (all known as Baba Yaga) in a forest hut that spins continually on birds’ legs. Her fence is topped with human skulls. Baba Yaga can ride through the air—in an iron kettle or in a mortar that she drives with a pestle—creating tempests as she goes. She often accompanies Death on his travels, devouring newly released souls.",
)

def seed_creatures():
    creatures = [
        gryphon,
        kappa,
        vampire,
        baba_yaga,
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
        scp_049,
        bigfoot,
        thunderbird,
        unicorn
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
