
# Student Picker

| Information: |
| ------------ |
| Last Modified: 4/10/15 |
| Author: Brett Levenson |

This script takes the array of all students and creates the specified number of groups, 
with each group being of the specified size.
 
## Usage:
You can provide three different arguments:
  1. --call: This argument chooses one person for us to call upon.
  2. --groups=n: This argument determines the number of groups to create (where n is an integer)
  3. --size=n: This argument determines the size of the groups (where n is an integer)
 

## Notes:
  - If you provide --groups but not --size, the groups will be sized appropriately.
  - If you provide --size but not --groups, the script will generate the correct number of groups of that size
  - If you use the --call argument, all other arguments will be ignored.