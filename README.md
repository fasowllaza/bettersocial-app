## C1 Answer

1. Menggunakan DB yang dicaching yang dirunning saat pertama kali user mendaftarkan di diri di background dan  mungkin diupdate sebulan sekali
2. Jika tidak ada pengguna terkait atau terkoneksi maka bisa kita tambahkan variabel kedalam logic sehingga akan semakin lebih luas atau jika tidak ada juga
   kita bisa menambahkan seperti lokasi yang sama atau kantor yang sama atau jika tidak terpenuhi apapun bisa kita sarankan orang random dalam aplikasi kita
   , jika terlalu banyak maka bisa menggunakan logic checklist variabel dimana semakin banyak checklist yang terpenuhi maka orang tersebut akan semakin 
   terekomendasikan dan dibuat hirarki dimana suggestion nya dari yang paling banyak terpenuhi hingga ke yang paling sedikit
3. Cara menguji fiture tersebut bisa menggunakan data dummy dimana kita membuat hirarki yang memiliki kesamaan dari user profile kita ke yang paling sedikit

## C2 Answer

class User:
    def __init__(self, name, school, friends, family, hobbies):
        self.name = name
        self.school = school
        self.friends = friends
        self.family = family
        self.hobbies = hobbies

def calculate_similarity(user1, user2):
    # Define weights for each variable
    weights = {
        'school': 3,
        'friends': 2,
        'family': 2,
        'hobbies': 1
    }

    # Calculate similarity scores for each variable
    school_score = int(user1.school == user2.school)
    friends_score = len(set(user1.friends) & set(user2.friends))
    family_score = int(user1.family == user2.family)
    hobbies_score = len(set(user1.hobbies) & set(user2.hobbies))

    # Calculate the overall similarity score
    total_score = (
        weights['school'] * school_score +
        weights['friends'] * friends_score +
        weights['family'] * family_score +
        weights['hobbies'] * hobbies_score
    )

    return total_score

def suggest_users(current_user, all_users):
    # Calculate similarity scores for all users
    similarity_scores = [(user, calculate_similarity(current_user, user)) for user in all_users]

    # Sort users based on similarity scores in descending order
    sorted_users = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Return the sorted list of suggested users
    return [user[0] for user in sorted_users]

# Example Usage:
# Define users
user1 = User('Alice', 'School1', ['Bob', 'Charlie'], 'Family1', ['Reading', 'Painting'])
user2 = User('Bob', 'School1', ['Alice', 'Charlie'], 'Family2', ['Painting', 'Coding'])
user3 = User('Charlie', 'School2', ['Alice', 'Bob'], 'Family1', ['Coding', 'Hiking'])

# Define the current user
current_user = User('David', 'School1', ['Eva', 'Frank'], 'Family2', ['Reading', 'Coding'])

# Create a list of all users
all_users = [user1, user2, user3]

# Get suggested users for the current user
suggested_users = suggest_users(current_user, all_users)

# Print the suggested users
print("Suggested Users:")
for user in suggested_users:
    print(user.name)
