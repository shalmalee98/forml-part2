from flask import Flask, request, jsonify
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def num_correct_digits(combination, attempt):
    return sum(1 for a, b in zip(combination, attempt) if a == b)

def crack_safe(actual_combination: str):
    start_time = time.time()
    n = len(actual_combination)
    current_attempt = ['0'] * n
    attempts = 0
    correct_digits = 0
    
    # Initial attempt
    attempts += 1
    correct_digits = num_correct_digits(actual_combination, current_attempt)
    
    def backtrack(position):
        nonlocal attempts, correct_digits
        if position == n:
            return correct_digits == n
        
        for digit in '0123456789':
            current_attempt[position] = digit
            attempts += 1
            new_correct_digits = num_correct_digits(actual_combination, current_attempt)
            if new_correct_digits > correct_digits:
                old_correct_digits = correct_digits
                correct_digits = new_correct_digits
                if backtrack(position + 1):
                    return True
                correct_digits = old_correct_digits
        
        current_attempt[position] = '0'  # Reset this position before backtracking
        return False
    
    backtrack(0)
    
    end_time = time.time()
    time_taken = end_time - start_time
    print('what are the number of attempts: ', attempts)
    return attempts, time_taken

@app.route('/api/crack_safe/', methods=['POST'])
def api_crack_safe():
    data = request.json
    print('came inside api call')
    actual_combination = data.get("actual_combination")
    attempts, time_taken = crack_safe(actual_combination)
    response = jsonify({"attempts": attempts, "time_taken": time_taken})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/', methods=['GET'])
def api_start():
    print('hello world')
    return jsonify({"hello": "world"})

if __name__ == '__main__':
    app.run(debug=True)