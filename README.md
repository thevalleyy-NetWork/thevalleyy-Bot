# thevalleyy-Bot
Weird Discord-Bot


**config.js**
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
    }
}
```


**data directory**
```
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
Some of these files are smart enough to regenerate when deleted. Some not.



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
