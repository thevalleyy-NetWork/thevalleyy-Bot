# thevalleyy-Bot
Weird Discord-Bot


**config.js**
<<<<<<< HEAD
All following values are entered between quotation marks, unless otherwise described.
```json
{
    "token": /*discord bot token*/,
    "owner": /*owner's discord id*/,
    "cooldown_standard": /*default cooldown in seconds (number)*/,
    "cmd_log_color": /*hex color value for command log embed*/,
    "cmd_log_channel_id": /*discord channel id for command log*/,
    "mod_log_color": /*hex color value for command log embed*/,
    "mod_log_color_error": /*hex color value for error log embed*/,
    "mod_log_channel_id": /*discord channel id for mod log*/,
    "standard_color": /*hex color value for default embeds*/,
    "keys": {
        "brickset": /*brickset.com api key*/,
        "brickset_username": /*brickset.com account username*/,
        "brickset_password": /*brickset.com account password*/,
        "pexels": /*pexels.com api key*/
    },
    "mysql": {
        "host": /*database host*/,
        "port": /*database port (number)*/,
        "user": /*database user*/,
        "password": /*database password*/,
        "database": /*database table name*/
    },
    "channels": {
        "memberchannel": /*discord channel id for membercount channel*/,
        "welcomechannel": /*discord channel id for welcome messages*/
=======
```json
{
    "token": "<bot token>",
    "owner": "<discord id>",
    "cooldown_standard": <seconds of default cooldown>,
    "cmd_log_color": "<hex color for cmdlog embed>",
    "cmd_log_channel_id": "<channel id>",
    "mod_log_color": "<hex color for modlog embed>",
    "mod_log_color_error": "<hex color for errors>",
    "mod_log_channel_id": "<channel id>",
    "standard_color": "<hex color for most of the embeds>",
    "keys": {
        "brickset": "<brickset.com api key>",
        "brickset_username": "brickset.com username",
        "brickset_password": "brickset.com password",
        "pexels": "pexels.com api key"
    },
    "mysql": {
        "host": "database host",
        "port": database port,
        "user": "database user",
        "password": "database pwd",
        "database": "database username"
>>>>>>> e2e27057da40e2c7b47c2b86041a43ec52c4ea0e
    }
}
```


<<<<<<< HEAD

**data directory**
```
Some of these files are smart enough to regenerate when deleted. Some not.

=======
**data directory**
```
>>>>>>> e2e27057da40e2c7b47c2b86041a43ec52c4ea0e
/
├───other bot files
└───data/
    ├───cmd-json/
    ├───brickset.json
    ├───cmdstructure.json
    ├───maintenance.json
    ├───mcstats.json
    └───stats.json
```
<<<<<<< HEAD
=======
Some of these files are smart enough to regenerate when deleted. Some not.
>>>>>>> e2e27057da40e2c7b47c2b86041a43ec52c4ea0e



**database scheme**
```sql
CREATE TABLE `discord` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`dcid` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`dctag` VARCHAR(2000) NULL DEFAULT '[NOT-SET]' COLLATE 'utf8mb4_0900_ai_ci',
	`muted` TINYINT(3) NULL DEFAULT '0',
	`voicemuted` TINYINT(3) NULL DEFAULT '0',
	`blacklisted` TINYINT(3) NULL DEFAULT '0',
	`niceone` TINYINT(3) NULL DEFAULT '1',
	`joindate` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`oldestjoindate` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COMMENT='some things'
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=47
;

```
<<<<<<< HEAD
The database is required to be a mysql database.
=======
>>>>>>> e2e27057da40e2c7b47c2b86041a43ec52c4ea0e
