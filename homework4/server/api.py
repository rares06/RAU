from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
db_path = os.path.join(data_dir, 'magazin.db')

def connect_db():
    return sqlite3.connect(db_path)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()

    with connect_db() as connection:
        cursor = connection.cursor()
        cursor.execute('INSERT INTO produse (name, pret, cantitate, descriere) VALUES (?, ?, ?, ?)', (data['name'], data['pret'], data['cantitate'], data['descriere']))
        connection.commit()

    return jsonify({'message': 'Product added successfully'}), 201

@app.route('/api/products', methods=['GET'])
def get_all_products():
    with connect_db() as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM produse')
        products = cursor.fetchall()

    product_list = [{'id': row[0], 'name': row[1], 'pret': row[2], 'cantitate': row[3], 'descriere': row[4]} for row in products]
    return jsonify({'products': product_list})

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    with connect_db() as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM produse WHERE id = ?', (product_id,))
        product = cursor.fetchone()

    if product:
        return jsonify({'id': product[0], 'name': product[1], 'pret': product[2], 'cantitate': product[3], 'descriere': product[4]})
    else:
        return jsonify({'message': 'Product not found'}), 404

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()

    with connect_db() as connection:
        cursor = connection.cursor()
        cursor.execute('UPDATE produse SET name = ?, pret = ?, cantitate = ?, descriere = ? WHERE id = ?', (data['name'], data['pret'], data['cantitate'], data['descriere'], product_id))
        connection.commit()

    return jsonify({'message': 'Product updated successfully'})

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    with connect_db() as connection:
        cursor = connection.cursor()
        cursor.execute('DELETE FROM produse WHERE id = ?', (product_id,))
        connection.commit()

    return jsonify({'message': 'Product deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=2108)
