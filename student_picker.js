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
 * In any one call, you can provide one of three different arguments (but not more than one):
 * --call		This argument chooses one person for us to call upon.
 * --groups=n 	This argument determines the number of groups to create (where n is an integer)
 * --size=n		This argument determines the size of the groups (where n is an integer)
 *
 * Notes:
 * - If you provide --groups but not --size, the groups will be sized appropriately.
 * - If you provide --size but not --groups, the script will generate the correct number of groups of that size
 * - If you use the --call argument, all other arguments will be ignored.
 */

// Check to make sure only 1 argument was provided:
if(process.argv.length !== 3) {
	// More than 3 elements in argv array. Let the user know they have made a mistake in usage.
	console.log("Error: Only 1 flag should be used at a time...");
	console.log("Usage:");
	console.log("student_picker.js --call");
	console.log("student_picker.js --groups=n");
	console.log("student_picker.js --size=n");
	console.log("(Where n is an integer)");
	process.exit();
}

var re = /^--(call|groups|size)\=([0-9]+)$/;
var flag = re.exec(process.argv[2]);
var options = {
	action: flag[1],
	value: flag[2]
};

// console.log(options);
// process.exit();

var students = [ 
"Dennis Bishop", "Mark Blum", "James Bradley", "Kristina Chang", "Allxie Cleary", 
"Darrell Cohn", "Jeff Ercolani", "Steven Gordon", "Rachel Harrigan", "Emily Hittle", 
"Jessica Lombera", "Heidi Kahkonen", "Catherine Kazbour", "John Michels", "Lyn Muldrow", 
"Andrew Patzsch", "Jane Philipps", "Annie Pennell", "Patrick Racenberg", "Cristina Reames", 
"Michael Reekers", "Chris Reeve", "Rasheed Romain", "Chhun So", "David Spencer", 
"Arati Sureddi", "Addison Tam", "Hing Tang", "Alex Trzeciak", "Monet Wilson" ];


// These are the functions we'll need

var chooseGroups = function(arr) {

	var result = [];
	var chosen;
	for (var i = 0; i < args.numGroups; i++) { // Loop will run one up to the number of groups we want to create
		if(!arr.length) { // If we run out of elements in the array, just return early (happens when more than 15 groups are defined)
			return result;
		}

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

var generate_n_groups = function(students, numGroups) {
	var groups = [];

	while(students.length) {
		for(var i = 0; i < numGroups; i++) {
			groups[i] = groups[i] || [];

			// We grab one person at a time from the array with splice and push element
			// at index 0 into the groups array.
			var random = Math.floor(Math.random() * students.length);
			var student = students.splice(random, 1);
			groups[i].push(student[0]);

			if(!students.length) break; // If students array is empty, exit
			// console.log("Students is:", students, "Student is:", student, "And i is:", i);
		}
	}

	return groups;

}

var generate_groups_of_size = function(students, groupSize) {
	var groups = [];
	var i = 0;
	while(students.length) {
		groups[i] = [];
		while(groups[i].length < groupSize) {
			var random = Math.floor(Math.random() * students.length);
			var student = students.splice(random, 1);
			groups[i].push(student[0]);

			if(!students.length) break; // If there are no more students, then break
		}

		i++;
	}

	return groups;
}


var outputGroups = function(groups) {
	var groupId = 1;
	groups.forEach(function(group) {
		console.log("\nGroup", groupId++);
		console.log(group.join(", "));
	})
}

// Now we need to get the right values for "groups" and "size" (AKA size of each group)
var args = {};
var output, numGroups, groupSize;

process.argv.slice(2).forEach(function (arg) {
	if (arg === "--call") {
		args.call = true;
		args.numGroups = 1;
		args.groupSize = 1;
	} else {
		args.call = false;
	}

	if(numGroups = /^--groups\=([0-9]{1,})/.exec(arg)) { // look for a groups argument
		args.numGroups = numGroups[1];
	}

	if(groupSize = /^--size\=([0-9]{1,})/.exec(arg)) { // look for a size argument
		args.groupSize = groupSize[1];
	}


});

// Only one of the two arguments should be set, or the argument --call should be set
if(!args.call) {
	// We need to set some default values based on what has been passed
	if (args.groupSize && !args.numGroups) {
		outputGroups(generate_groups_of_size(students, args.groupSize));
		// args.numGroups = Math.ceil(students.length / args.groupSize);
	} else if (args.numGroups && !args.groupSize) {
		outputGroups(generate_n_groups(students, args.numGroups));
		process.exit();
	} else if (!args.numGroups && !args.groupSize) {
		// if both are unset get them set with defaults, or if both are set, leave with settings
		args.groupSize = args.groupSize || 2; // default to buddy grouping
		args.numGroups = args.numGroups || Math.ceil(students.length / args.groupSize);
	}
} else {
	var rand = Math.random();
	var studentPick = Math.round(rand * (students.length-1));
	console.log(students[studentPick]+", you're up!");
	process.exit();
}

// Ok, we're done getting everything set up, now let's make some matches.


// Run the function to generate the groups and output them to screen

var output = output || chooseGroups(students)

outputGroups(output);












