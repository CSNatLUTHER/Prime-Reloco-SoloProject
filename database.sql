
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--> USER TABLE
----------------------------------------

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "role" VARCHAR (80) NOT NULL);
    
    
--> EVENT TABLE
-----------------------------------------
    
CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"move_date" DATE NOT NULL,
	"create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"creator_user_id" INTEGER NOT NULL,
	"share_code" VARCHAR (8) NOT NULL);
	
	
--> USER_EVENT TABLE
-----------------------------------------
    
CREATE TABLE "user_event" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"event_id" INTEGER NOT NULL);	
	
	
--> DESTINATION TABLE
-----------------------------------------
    
CREATE TABLE "destination" (
	"id" SERIAL PRIMARY KEY,
	"destination" VARCHAR (80) NOT NULL);	

	
--> ITEM TABLE
-----------------------------------------
    
CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"qr_id" VARCHAR (80),
	"name" VARCHAR (80) NOT NULL,
	"put_in_box" BOOLEAN NOT NULL,
	"value" INTEGER,
	"create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"creator_user_id" INTEGER NOT NULL,
	"last_update_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"last_modified_user_id" INTEGER NOT NULL,
	"event_id" INTEGER NOT NULL,
	"destination_id" INTEGER NOT NULL,
	"image_path" VARCHAR (1000));	
	

--> BOX TABLE
-----------------------------------------
    
CREATE TABLE "box" (
	"id" SERIAL PRIMARY KEY,
	"qr_id" VARCHAR (80),
	"name" VARCHAR (80) NOT NULL,
	"create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"creator_user_id" INTEGER NOT NULL,
	"last_update_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"last_modified_user_id" INTEGER NOT NULL,
	"event_id" INTEGER NOT NULL,
	"size" VARCHAR (80),
	"weight" VARCHAR (80),
	"destination_id" INTEGER NOT NULL);
	

--> ITEM_BOX TABLE
-----------------------------------------
    
CREATE TABLE "item_box" (
	"id" SERIAL PRIMARY KEY,
	"item_id" INTEGER NOT NULL,
	"box_id" INTEGER NOT NULL,
	"create_date" DATE NOT NULL DEFAULT CURRENT_DATE,
	"creator_user_id" INTEGER NOT NULL);	
	

	
--> CONTACT_US TABLE
-----------------------------------------
    
CREATE TABLE "contact_us" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
    "email" VARCHAR (80) NOT NULL,
    "subject" VARCHAR (120) NOT NULL,
    "message" VARCHAR (1000) NOT NULL,
    "create_date" DATE NOT NULL DEFAULT CURRENT_DATE);
	

--> TEST EVENT_USER GET
-----------------------------------------
	SELECT "user".id, first_name, last_name, event.creator_user_id 
	FROM "user"
    JOIN user_event ON "user".id=user_event.user_id
    JOIN event ON user_event.event_id=event.id
    WHERE user_event.event_id=1
    GROUP BY event.creator_user_id, "user".id
    ORDER BY "user".first_name ASC;
	
--> TEST SELECT ITEM
------------------------------------------
	SELECT item.id, item.qr_id, item.name, item.put_in_box, item.value, item.create_date, item.creator_user_id, item.last_update_date, item.last_modified_user_id, item.event_id, item.destination_id, 			item.image_path, destination.destination FROM item
    JOIN destination ON item.destination_id=destination.id
    WHERE item.event_id=1
    ORDER BY item.id ASC;

--> TEST SELECT BOX FROM QR CODE
------------------------------------------
	SELECT * FROM box
	WHERE qr_id = 'CSN12345IRE';	

--> TEST SEARCH ITEM
------------------------------------------	
	SELECT * FROM item
    WHERE (item.name ILIKE '%Dishes%' AND item.event_id=1)
    OR (item.qr_id ILIKE '%Dishes%' AND item.event_id=1);
    

--> TEST SELECT ITEMS IN BOX
------------------------------------------  
	SELECT * FROM box_item
	JOIN item ON box_item.item_id=item.id
	WHERE box_item.box_id=1
    ORDER BY item.create_date DESC;
    
--> TEST FINDING EVENT FROM EVENT CODE
------------------------------------------  
	SELECT *  FROM event
	WHERE share_code='PNRITNUD';
	
--> TEST CREATE USER_EVENT ROW
------------------------------------------  

	INSERT INTO user_event ("user_id", "event_id")
	VALUES ( 1, 2 );

--> TEST FETCH EVENTS ASSIGNED TO USER
------------------------------------------  

	SELECT event.id, name, move_date, create_date, creator_user_id, share_code FROM user_event
	JOIN event ON user_event.event_id=event.id
	WHERE user_event.user_id = 1
	GROUP BY event.id
	ORDER BY event.create_date DESC;
	
	SELECT first_name AS owner_first_name, last_name AS owner_last_name, event.id, name, move_date, event.create_date, creator_user_id, share_code FROM user_event
   JOIN event ON user_event.event_id=event.id
   JOIN "user" ON "user".id=event.creator_user_id
   WHERE user_event.user_id = 1
   GROUP BY event.id, first_name, last_name
   ORDER BY event.create_date DESC;
	
--> TEST FETCH EVENTS ASSIGNED TO USER
------------------------------------------ 
	
	INSERT INTO "event" ("name", "move_date","creator_user_id", "share_code")
    VALUES ('NEW MOVE', '2022-05-23', 1, 'NUWOTYPQ')
    RETURNING "id";
    
                
--> TEST DELETE USER_EVENT RECORD
------------------------------------------ 
	
	DELETE FROM  user_event
	WHERE (user_event.event_id=1 AND user_event.user_id=1);
	

--> TEST SEARCH FOR BOX
------------------------------------------                

	SELECT * FROM box
    WHERE (box.name ILIKE '%CSN%' AND box.event_id=1)
    OR (box.qr_id ILIKE '%CSN%' AND box.event_id=1)
    ORDER BY "create_date" DESC;                
                

--> TEST CREATE NEW BOX
------------------------------------------                

	INSERT INTO "box" ("qr_id", "name", "creator_user_id", "last_modified_user_id", "event_id", "size", "weight", "destination_id")
 	VALUES ('NEL10007IRE', 'Dishes', 1, 1, 1, 'SMALL', 'HEAVY', 1)
 	RETURNING "id";                   
    
--> TEST DELETE EVENT
------------------------------------------
   
	DELETE FROM event
	WHERE id = 10;

--> TEST UPDATE BOX
------------------------------------------

	UPDATE "box"
	SET ("qr_id" = $1, "name" = $2, "creator_user_id" = $3, "last_modified_user_id" = $4, "event_id" = $5, "size" = $6, "weight" = $7, "destination_id" = $8, "last_update_date" = CURRENT_DATE)
	WHERE "id"=1
	RETURNING "id";  

--> TEST SELECT ITEM WITH ASSOCIATED BOX AND DESTINATION NAME
------------------------------------------
	SELECT * FROM item
	JOIN destination ON item.destination_id=destination.id;


--> TEST SELECT BOX CONTENTS ITEM
------------------------------------------	
	
	SELECT *  FROM box_item
  	JOIN item ON box_item.item_id=item.id
	JOIN destination ON item.destination_id=destination.id
  	WHERE box_item.box_id=1
	ORDER BY item.create_date DESC;   
	
	
--> TEST SELECT EVENT FROM SHARE CODE
------------------------------------------

	SELECT first_name AS owner_first_name, last_name AS owner_last_name, event.id, name, move_date, event.create_date, creator_user_id, share_code 
	FROM user_event
	JOIN event ON user_event.event_id=event.id
	JOIN "user" ON "user".id=event.creator_user_id
	WHERE share_code = 'BXQVOWNU'
	GROUP BY event.creator_user_id, "user".id, event.id;
	