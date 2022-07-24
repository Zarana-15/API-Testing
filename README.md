db.employees.insert({
        "emp_id": 4,
        "name": "SHIFRA REYNOLDS",
        "age": 25,
        "email": "shifra.reynolds_4@connectwise.com",
        "org_id": "CW",
        "dept_id": "D101CW",
        "joining_date": "14/07/2022"
    })


    _______________________________________________

    Insert Conflicts            Pending
    Update Conflicts            Pending
    Delete COnflicts            Resolved
    ___________________________________________________


    Mongodb Search index syntax
    [
  {
    "$search": {
      "index": "searchEmployees",
      "text": {
        "query": "string",
        "path": {
          "wildcard": "*"
        }
      }
    }
  }
]
___________________________________________________________
[
  {
    '$search': {
      'index': 'searchEmployee', 
      'text': {
        'query': 'dunphy', 
        'path': 'name'
      }, 
      'highlight': {
        'path': 'name'
      }
    }
  }, {
    '$project': {
      'name': 1, 
      'email': 1, 
      'score': {
        '$meta': 'searchScore'
      }, 
      'highlights': {
        '$meta': 'searchHighlights'
      }
    }
  }
]