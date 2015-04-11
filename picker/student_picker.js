#!/usr/local/bin/node
/* 
 * Student Picker
 * Last Modified: 4/10/15
 * Author: Brett Levenson
 *
 * This script takes the array of all students and creates the specified number of groups, 
 * with each group being of the specified size.
 * 
 * Usage:
 * You can provide three different arguments:
 * --call		This argument chooses one person for us to call upon.
 * --groups=n 	This argument determines the number of groups to create (where n is an integer)
 * --size=n		This argument determines the size of the groups (where n is an integer)
 *
 * Notes:
 * - If you provide --groups but not --size, the groups will be sized appropriately.
 * - If you provide --size but not --groups, the script will generate the correct number of groups of that size
 * - If you use the --call argument, all other arguments will be ignored.
 */


var students = [ 
"Dennis Bishop", "Mark Blum", "James Bradley", "Kristina Chang", "Allxie Cleary", 
"Darrell Cohn", "Jeff Ercolani", "Steven Gordon", "Rachel Harrigan", "Emily Hittle", 
"Jessica Lombera", "Heidi Kahkonen", "Catherine Kazbour", "John Michels", "Lyn Muldrow", 
"Andrew Patzsch", "Jane Philipps", "Annie Pennell", "Patrick Racenberg", "Cristina Reames", 
"Michael Reekers", "Chris Reeve", "Rasheed Romain", "Chhun So", "David Spencer", 
"Arati Sureddi", "Addison Tam", "Hing Tang", "Alex Trzeciak", "Monet Wilson" ];

// Now we need to get the right values for "groups" and "size" (AKA size of each group)
var args = {};
var groups;
var size;
process.argv.slice(2).forEach(function (arg) {
	if (arg === "--call") {
		args.call = true;
		args.groups = 1;
		args.groupSize = 1;
	} else {
		args.call = false;
	}

	if(groups = /^--groups\=([0-9]{1,})/.exec(arg)) { // look for a groups argument
		args.groups = groups[1];
	}

	if(size = /^--size\=([0-9]{1,})/.exec(arg)) { // look for a size argument
		args.groupSize = size[1];
	}


});

// Only one of the two arguments should be set, or the argument --call should be set
if(!args.call) {
	// We need to set some default values based on what has been passed
	if (args.groupSize && !args.groups) {
		args.groups = Math.ceil(students.length / args.groupSize);
	} else if (args.groups && !args.groupSize) {
		args.groupSize = Math.ceil(students.length / args.groups);
	} else if (!args.groups && !args.groupSize) {
		// if both are unset get them set with defaults, or if both are set, leave with settings
		args.groupSize = args.groupSize || 2; // default to buddy grouping
		args.groups = args.groups || Math.ceil(students.length / args.groupSize);
	}
} else {
	var rand = Math.random();
	var studentPick = Math.round(rand * (students.length-1));
	console.log(students[studentPick]+", you're up!");
	process.exit();
}

// Ok, we're done getting everything set up, now let's make some matches.



var chooseGroups = function(arr) {

	var result = [];
	var chosen;
	for (var i = 0; i < args.groups; i++) { // Loop will run one up to the number of groups we want to create

		chosen = [];
		for(var j = 0; j < args.groupSize; j++) {
			var person = arr.splice(Math.round((Math.random() * (arr.length - 1))), 1);
			if(person[0] !== undefined) {
				chosen.push(person[0]);
			}
		}

		result.push(chosen);
	}

	return result;

}


var outputGroups = function(groups) {
	var groupId = 1;
	groups.forEach(function(group) {
		console.log("\nGroup", groupId++);
		console.log(group.join(", "))
	})
}

// Run the function to generate the groups and output them to screen
outputGroups(chooseGroups(students));












