public class Student {
    private String name;
    private String rollNumber;
    private String grade;
    private int age;

    public Student(String name, String rollNumber, String grade, int age) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grade = grade;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public String getGrade() {
        return grade;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String toCSV() {
        return name + "," + rollNumber + "," + grade + "," + age;
    }

    public static Student fromCSV(String csvLine) {
        String[] parts = csvLine.split(",");
        return new Student(parts[0], parts[1], parts[2], Integer.parseInt(parts[3]));
    }

    @Override
    public String toString() {
        return String.format("👤 Name: %s | 🆔 Roll: %s | 🎓 Grade: %s | 🎂 Age: %d", name, rollNumber, grade, age);
    }
}
