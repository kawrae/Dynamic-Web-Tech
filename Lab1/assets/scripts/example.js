console.log("Welcome to the first lab of Dynamic Web Technologies");

// name challenge
let firstName = "Corey";
let lastName = "Black";

let fullName = `${firstName} ${lastName}`;

console.log(fullName);

// arrow function
const doubleNumbers = (numbers) => numbers.map(num => num * 2);

const myArray = [1, 2, 3, 4, 5];

console.log(doubleNumbers(myArray));

// student object
const student = {
  name: "Corey",
  course: "Web and Mobile Development",
  grades: [70, 65, 80, 75],

  averageGrade() {
    let total = 0;

    for (let i = 0; i < this.grades.length; i++) {
      total += this.grades[i];
    }

    return total / this.grades.length;
  }
};

console.log(student.averageGrade());


// student grades
const Students = [
  { name: "Corey", grade: 100 },
  { name: "Max", grade: 21 },
  { name: "Abdullah", grade: 100 },
  { name: "Sam", grade: 28 }
];

for (let i = 0; i < Students.length; i++) {
  if (Students[i].grade >= 40) {
    console.log(Students[i].name + " passed the Dynamic Web Technologies module.");
  } else {
    console.log(Students[i].name + " failed the Dynamic Web Technologies module.");
  }
}

// student information system
class Student {
  constructor(name, course, grades) {
    this.name = name;
    this.course = course;
    this.grades = grades;
  }

  averageGrade() {
    let total = 0;
    for (let i = 0; i < this.grades.length; i++) {
      total += this.grades[i];
    }
    return total / this.grades.length;
  }
}

const students = [];

function addStudent(name, course, grades) {
  const student = new Student(name, course, grades);
  students.push(student);
}

function getStudent(name) {
  return students.find(student => student.name === name);
}

function classifyStudents() {
  for (let i = 0; i < students.length; i++) {
    const avg = students[i].averageGrade();

    if (avg >= 40) {
      console.log(students[i].name + " passed with an average of " + avg);
    } else {
      console.log(students[i].name + " failed with an average of " + avg);
    }
  }
}

addStudent("Corey", "Web and Mobile Development", [60, 70, 65]);
addStudent("Alex", "Web and Mobile Development", [30, 35, 25]);
addStudent("Jamie", "Web and Mobile Development", [40, 45, 50]);

classifyStudents();
