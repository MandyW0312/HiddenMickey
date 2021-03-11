TRUNCATE TABLE "HiddenMickeys" RESTART IDENTITY;

INSERT INTO "Parks" ("Name") VALUES ('Magic Kingdom');
INSERT INTO "Parks" ("Name") VALUES ('Epcot');
INSERT INTO "Parks" ("Name") VALUES ('Hollywood Studios');
INSERT INTO "Parks" ("Name") VALUES ('Animal Kingdom');

INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Main Street USA', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Fantasyland', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Tomorrowland', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Adventureland', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Frontierland', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Liberty Square', 1);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Future World', 2);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('World Showcase', 2);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Hollywood Boulevard', 3);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Sunset Boulevard', 3);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Pixar Place', 3);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Streets Of America', 3);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Entrance Plaza', 4);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('The Oasis', 4);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Discovery Island', 4);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Africa', 4);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Asia', 4);
INSERT INTO "AreaOfTheParks" ("Name", "ParkId") VALUES ('Dinoland USA', 4);

INSERT INTO "HiddenMickeys" ("Location", "Clue", "Hint", "AreaOfTheParkId") VALUES ('Mickey’s PhilharMagic', 'In the attraction’s 3-D film itself, there is a series of Hidden Mickeys, everybody look left in The Lion King scene.', 'In The Lion King sequence, look to the far left of the screen; there is a grouping of trees that form a classic Hidden Mickey.', 2);
INSERT INTO "HiddenMickeys" ("Location", "Clue", "Hint", "AreaOfTheParkId") VALUES ('Be Our Guest Restaurant', 'A classic Hidden Mickey can be found on the short rock wall to the left of the restaurant’s check-in desk.', 'It’s on top of the last flat rectangular stone before the wall ends at the left side of the check-in station.', 2);
INSERT INTO "HiddenMickeys" ("Location", "Clue", "Hint", "AreaOfTheParkId") VALUES ('Bon Jour! Village Gifts', 'Being the avid reader that Belle is, it would only seem appropriate there are extra special bookends in the window of this shop.', 'The bookends in the outside window form the shape of Mickey’s head.', 2);
INSERT INTO "HiddenMickeys" ("Location", "Clue", "Hint", "AreaOfTheParkId") VALUES ('The Enchanted Forest Grounds', 'On the footbridge extending from Pinocchio Village Haus to the Enchanted Forest, there are horse hoof prints embedded in the cement walkways.', 'Find three hoof prints strategically situated together to form a classic Hidden Mickey.', 2);