module.exports = {


  friendlyName: 'Seed data',


  description: 'Seed questions and answers in database',


  inputs: {},


  fn: async function (inputs, exits) {
    sails.log('Dropping Question and Answer collections..');
    try {
      await Promise.all([Question.destroy({}).toPromise(), Answer.destroy({}).toPromise()]);
      sails.log('Successfully dropped Question and Answer collections..');
    } catch (err) {
      sails.log('error while dropping Question and Answer collections', err);
      exits.error(err);
    }

    sails.log('Starting question and answers seeder..');
    let seededQuestions = await Question.createEach(data.map(q => ({
      body: q.body,
      difficulty: q.difficulty
    }))).fetch();

    seededQuestions.forEach(async seededQuestion => {
      const answers = _.find(data, dataQuestion => seededQuestion.body === dataQuestion.body).answers
        .map(ans => ({
          ...ans,
          question: seededQuestion.id
        }));
      let seededAnswers = await Answer.createEach(answers).fetch();
    });

    return exits.success(await Question.find().populate('answers'));
  }


};

const data = [{
  body: 'Which of the following statements is true?',
  answers: [{
      value: 'Python is a high level programming language.',
      isCorrect: false
    },
    {
      value: 'Python is an interpreted language.',
      isCorrect: false
    },
    {
      value: 'Python is an object-oriented language.',
      isCorrect: false
    },
    {
      value: 'All of the above.',
      isCorrect: true
    }
  ]
}, {
  body: 'What is used to define a block of code (body of loop, function etc.) in Python?',
  answers: [{
      value: 'Curly braces',
      isCorrect: false
    },
    {
      value: 'Parenthesis',
      isCorrect: false
    },
    {
      value: 'Indentation',
      isCorrect: true
    },
    {
      value: 'Quotation',
      isCorrect: false
    }
  ]
}, {
  body: 'Which of the following is correct?',
  answers: [{
      value: 'Comments are for programmers for better understanding of the program.',
      isCorrect: false
    },
    {
      value: 'Python Interpreter ignores comment.',
      isCorrect: false
    },
    {
      value: 'You can write multi-line comments in Python using triple quotes, either \'\'\' or """.',
      isCorrect: false
    },
    {
      value: 'All of the above.',
      isCorrect: true
    }
  ]
}, {
  body: 'Which of these is correct?',
  answers: [{
      value: 'Variable name can start with an underscore.',
      isCorrect: true
    },
    {
      value: 'Variable name can start with a digit.',
      isCorrect: false
    },
    {
      value: 'Keywords cannot be used as a variable name.',
      isCorrect: false
    },
    {
      value: 'Variable name can have symbols like: @, #, $ etc.',
      isCorrect: false
    }
  ]
}, {
  body: 'In the following code, n is a/an _______?<code>n = "5"</code>',
  answers: [{
      value: 'integer',
      isCorrect: false
    },
    {
      value: 'string',
      isCorrect: true
    },
    {
      value: 'tuple',
      isCorrect: false
    },
    {
      value: 'operator',
      isCorrect: false
    }
  ]
}, {
  body: 'What is the output of the following code?<code>print(1, 2, 3, 4, sep="*")</code>',
  answers: [{
      value: '1 2 3 4',
      isCorrect: false
    },
    {
      value: '1234',
      isCorrect: false
    },
    {
      value: '1*2*3*4',
      isCorrect: true
    },
    {
      value: '24',
      isCorrect: false
    }
  ]
}, {
  body: 'What is used to take input from the user in Python?',
  answers: [{
      value: 'cin',
      isCorrect: false
    },
    {
      value: 'scanf()',
      isCorrect: false
    },
    {
      value: 'input()',
      isCorrect: true
    },
    {
      value: '<>',
      isCorrect: false
    }
  ]
}, {
  body: 'What is the output of the following code?<code>print(3 >= 3)</code>',
  answers: [{
      value: '3 >= 3',
      isCorrect: false
    },
    {
      value: 'True',
      isCorrect: true
    },
    {
      value: 'False',
      isCorrect: false
    },
    {
      value: 'None',
      isCorrect: false
    }
  ]
}, {
  body: 'The statement using and operator results true if _______',
  answers: [{
      value: 'both operands are true',
      isCorrect: true
    },
    {
      value: 'both operands are false',
      isCorrect: false
    },
    {
      value: 'either of the operands is true',
      isCorrect: false
    },
    {
      value: 'first operand is true',
      isCorrect: false
    }
  ]
}, {
  body: 'What are the method(s) that iterator object must implement?',
  difficulty: 3,
  answers: [{
      value: '__iter__()',
      isCorrect: false
    },
    {
      value: '__iter__() and __next__()',
      isCorrect: true
    },
    {
      value: '__iter__() and __super__()',
      isCorrect: false
    },
    {
      value: '__iter__(), __super__() and __next__()',
      isCorrect: false
    }
  ]
}, {
  body: 'How can you create an iterator object from a list?',
  difficulty: 3,
  answers: [{
      value: 'By passing the given list to the iter() function.',
      isCorrect: true
    },
    {
      value: 'By using a for loop.',
      isCorrect: false
    },
    {
      value: 'By using a while loop.',
      isCorrect: false
    },
    {
      value: 'You cannot create an iterable object from the list.',
      isCorrect: false
    }
  ]
}, {
  body: 'If a function contains at least one <code>yield</code> statement, it becomes ______',
  difficulty: 3,
  answers: [{
      value: 'an iterable',
      isCorrect: false
    },
    {
      value: 'a generator function',
      isCorrect: true
    },
    {
      value: 'an anonymous function',
      isCorrect: false
    },
    {
      value: 'None of the above',
      isCorrect: false
    }
  ]
}, {
  body: 'What are the criterias that must be met to create closure in Python?',
  difficulty: 3,
  answers: [{
      value: 'Program Must have a function inside a function.',
      isCorrect: false
    },
    {
      value: 'The nested function must refer to a value defined in the enclosing function.',
      isCorrect: false
    },
    {
      value: 'The enclosing function must return the nested function.',
      isCorrect: false
    },
    {
      value: 'All of the above.',
      isCorrect: true
    }
  ]
}, {
  body: 'Which of the following statement is true?',
  difficulty: 3,
  answers: [{
      value: 'You cannot chain multiple decorators in Python.',
      isCorrect: false
    },
    {
      value: 'Decorators doesn’t work with functions that take parameters.',
      isCorrect: false
    },
    {
      value: 'The @ symbol doesn’t have any use while using decorators.',
      isCorrect: false
    },
    {
      value: 'None of the above',
      isCorrect: true
    }
  ]
}, {
  body: 'What is the more pythonic way to use getters and setters?',
  difficulty: 3,
  answers: [{
      value: 'Decorators',
      isCorrect: false
    },
    {
      value: 'Generators',
      isCorrect: false
    },
    {
      value: 'Iterators',
      isCorrect: false
    },
    {
      value: '@property',
      isCorrect: true
    }
  ]
}, {
  body: 'In Python, there is a built-in function property() that returns a property object. The property object has which of the following methods?',
  difficulty: 3,
  answers: [{
      value: 'getter() and setter()',
      isCorrect: false
    },
    {
      value: 'getter(), setter() and delete()',
      isCorrect: true
    },
    {
      value: 'getter() and delete()',
      isCorrect: false
    },
    {
      value: 'setter() and delete()',
      isCorrect: false
    }
  ]
}, {
  body: 'What is this? <code>exec((lambda x:x).func_code.__class__(0,0,0,0,"\x91\x03\x30d\x37\x13",(),(),(),"","",0,""))</code>',
  difficulty: 3,
  answers: [{
      value: 'Some random invalid code',
      isCorrect: false
    },
    {
      value: 'Regular expression match check',
      isCorrect: false
    },
    {
      value: 'ASCII characters call',
      isCorrect: false
    },
    {
      value: 'A way to execute python bytecode in Python 2',
      isCorrect: true
    }
  ]
}, {
  body: 'What will be value of variable a <code>a = ( "bay" and "cat" )</code> ?',
  difficulty: 3,
  answers: [{
      value: 'True',
      isCorrect: false
    },
    {
      value: 'False',
      isCorrect: false
    },
    {
      value: '"bay"',
      isCorrect: false
    },
    {
      value: '"cat"',
      isCorrect: true
    }
  ]
}, {
  body: 'Which of the following statements is true??',
  difficulty: 2,
  answers: [{
      value: 'A class is blueprint for the object.',
      isCorrect: true
    },
    {
      value: 'You can only make a single object from the given class.',
      isCorrect: false
    },
    {
      value: 'Both statements are true.',
      isCorrect: false
    },
    {
      value: 'Neither statement is true.',
      isCorrect: false
    }
  ]
}, {
  body: 'What does the <code>__init__()</code> function do in Python?',
  difficulty: 2,
  answers: [{
      value: 'Initializes the class for use.',
      isCorrect: false
    },
    {
      value: 'This function is called when a new object is instantiated.',
      isCorrect: true
    },
    {
      value: 'Initializes all the data attributes to zero when called.',
      isCorrect: false
    },
    {
      value: 'None of the above.',
      isCorrect: false
    }
  ]
}, {
  body: 'If you a class is derived from two different classes, it’s called ______',
  difficulty: 2,
  answers: [{
      value: 'Multilevel Inheritance',
      isCorrect: false
    },
    {
      value: 'Multiple Inheritance',
      isCorrect: true
    },
    {
      value: 'Hierarchical Inheritance',
      isCorrect: false
    },
    {
      value: 'Python Inheritance',
      isCorrect: false
    }
  ]
}, {
  body: 'What is correct?',
  difficulty: 2,
  answers: [{
      value: 'In Python, same operator may behave differently depending upon operands.',
      isCorrect: false
    },
    {
      value: 'You can change the way operators behave in Python.',
      isCorrect: false
    },
    {
      value: 'Special method __add()__ is called when + operator is used.',
      isCorrect: false
    },
    {
      value: 'All of the above.',
      isCorrect: true
    }
  ]
}, {
  body: 'How do you create a package so that the following reference will work?<code>p = mytools.myparser.MyParser()</code>',
  difficulty: 2,
  answers: [{
      value: 'Declare the myparser package in mytools.py',
      isCorrect: false
    },
    {
      value: 'Create an __init__.py in the home dir',
      isCorrect: false
    },
    {
      value: 'Inside the mytools dir create a __init__.py and myparser.py',
      isCorrect: true
    },
    {
      value: 'Create a myparser.py directory inside the mytools directory',
      isCorrect: false
    },
    {
      value: 'This can not be done',
      isCorrect: false
    }
  ]
}, {
  body: 'Which module in Python supports regular expressions?',
  difficulty: 2,
  answers: [{
      value: 're',
      isCorrect: true
    },
    {
      value: 'regex',
      isCorrect: false
    },
    {
      value: 'pyregex',
      isCorrect: false
    },
    {
      value: 'None of the above',
      isCorrect: false
    }
  ]
}, {
  body: 'Which of the following is not a complex number?',
  difficulty: 2,
  answers: [{
      value: 'k = 2 + 3j',
      isCorrect: false
    },
    {
      value: 'k = complex(2, 3)',
      isCorrect: false
    },
    {
      value: 'k = 2 + 3l',
      isCorrect: true
    },
    {
      value: 'k = 2 + 3J',
      isCorrect: false
    }
  ]
}, {
  body: 'What does <code>~~~~~~5</code> evaluate to?',
  difficulty: 2,
  answers: [{
      value: '+5',
      isCorrect: true
    },
    {
      value: '-11',
      isCorrect: false
    },
    {
      value: '+11',
      isCorrect: true
    },
    {
      value: '-5',
      isCorrect: false
    }
  ]
}, {
  body: 'Given a string <code>s = “Welcome”</code>, which of the following code is incorrect?',
  difficulty: 2,
  answers: [{
      value: 'print s[0]',
      isCorrect: true
    },
    {
      value: 'print s.lower()',
      isCorrect: false
    },
    {
      value: 's[1] = ‘r’',
      isCorrect: true
    },
    {
      value: 'print s.strip()',
      isCorrect: false
    }
  ]
}];
