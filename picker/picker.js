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


// These functions make all this possible

var user_error = function(msg) {
	console.log("Error:", msg);
	console.log("Usage:");
	console.log("student_picker.js --call");
	console.log("student_picker.js --groups=n");
	console.log("student_picker.js --size=n");
	console.log("(Where n is an integer)");
}

// For --call flag, picks 1 student from list and calls on them.
var call_on_student = function(students) {
	var random = Math.floor(Math.random() * students.length);
	return students[random];
}

// For --groups=N, generates N groups of M students where M = students.length/N
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

// For --size=N: Generates M groups, each with N students where M = students.length/N
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


var output_groups = function(groups) {
	groups.forEach(function(group, index, groups) {
		console.log("\nGroup", (index + 1));
		console.log(group.join(", "));
	})
}

// NOW WE GET INTO THE PROCEDURAL PART OF THIS SCRIPT:
// Check to make sure only 1 argument was provided:
if(process.argv.length !== 3) {
	// More than 3 elements in argv array. Let the user know they have made a mistake in usage.
	user_error("You must include exactly 1 of the three flags to specify a mode...");
	process.exit(1);
}

var re = /^--(call|groups|size)\=*([0-9]*)$/;
var flag = re.exec(process.argv[2]);

// modes is what will hold our flag and its value
var modes = {
	action: flag[1],
	value: flag[2]
};

if(modes.action !== "call" && !modes.value) {
	user_error("Syntax error. Flag `--"+modes.action+"` requires a value...");
	process.exit(1);
}

var students = [ 
"Dennis Bishop", "Mark Blum", "James Bradley", "Kristina Chang", "Allxie Cleary", 
"Darrell Cohn", "Jeff Ercolani", "Steven Gordon", "Rachel Harrigan", "Emily Hittle", 
"Jessica Lombera", "Heidi Kahkonen", "Catherine Kazbour", "John Michels", "Lyn Muldrow", 
"Andrew Patzsch", "Jane Philipps", "Annie Pennell", "Patrick Racenberg", "Cristina Reames", 
"Michael Reekers", "Chris Reeve", "Rasheed Romain", "Chhun So", "David Spencer", 
"Arati Sureddi", "Addison Tam", "Hing Tang", "Alex Trzeciak", "Monet Wilson" ];


// Now we need to get the right values for "groups" and "size" (AKA size of each group)
switch(modes.action) {
	case "call":
		console.log(call_on_student(students)+", you're up!");
	break;
	case "groups":
		output_groups(generate_n_groups(students, modes.value));
	break;
	case "size":
		output_groups(generate_groups_of_size(students, modes.value));
	break;
	default:
		console.log("Something went wrong!");
		process.exit(1);
}

process.exit();











