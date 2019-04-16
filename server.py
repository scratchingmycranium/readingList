import sys
import selenium
from flask import Flask, Response, jsonify, render_template, request
from notebook.tests import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

app = Flask(__name__)

current_id = 4
driver = None

books = [
 {
 "id": 1,
 "title": "Sample Title",
 "author": "Generic Author",
 "isbn": "123-1231231231",
 "own": "Owned", 
 "read": "Read",
 "priority": 3 
 }
]

@app.route('/')
def p(name=None):
    return render_template('books.html', data=books)  

@app.route('/save_book', methods=['GET', 'POST'])
def add_name():
    global books 
    global current_id 
 
    json_data = request.get_json()   
    title = json_data["title"] 
    author = json_data["author"] 
    isbn = json_data["isbn"]
    
    priority = json_data["priority"]
    priority = int(priority)
    
    own = 'Not Owned'
    if json_data["own"] == True:
        own = "Owned"
    
    read = "Not Read"
    if json_data["read"] == True:
        read = "Read"
 
    current_id += 1
    new_id = current_id 
    new_name_entry = {
        "id":  current_id,
        "title": title,
        "author": author,
        "isbn" : isbn,
        "own": own, 
        "read": read,
        "priority": priority 
    }
    books.insert(0, new_name_entry)
    return jsonify(data = books)

@app.route('/delete_book', methods=['GET', 'POST'])
def del_name():
    global books 
    global current_id 

    json_data = request.get_json()   
    id = json_data["id"]
    for i in books:
        if(int(i["id"]) == int(id)):
            books.remove(i)
            
    return jsonify(data = books)

@app.route('/sort', methods=['GET', 'POST'])
def sort_list():
    global books 
    sortBy = request.get_json()   
    s = []
    s = sorted(books,key= lambda i : i[sortBy])
    books = s
    return jsonify(data = books)

@app.route('/search_web', methods=['GET', 'POST'])
def search_web():
    global books
    global current_id
    global driver

    json_data = request.get_json()
    id = json_data["id"]
    name = None
    author = None
    for i in books:
        if(int(i["id"]) == int(id)):
            name = str(i['title'])
            author = str(i['author'])

    # bring up a firefox window
    
    if driver == None:
        driver = webdriver.Firefox()
    driver.get("https://www.google.com")
    elem = driver.find_element_by_name("q")
    elem.clear()
    elem.send_keys('%s by %s'%(name,author))
    elem.send_keys(Keys.RETURN)

    return 'a string'

if __name__ == '__main__':
   app.run(debug = True)
