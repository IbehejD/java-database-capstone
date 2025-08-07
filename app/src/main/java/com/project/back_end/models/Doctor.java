package com.project.back_end.models;

@Entity 
public class Doctor {

// @Entity annotation:
//    - Marks the class as a JPA entity, meaning it represents a table in the database.
//    - Required for persistence frameworks (e.g., Hibernate) to map the class to a database table.

    @Id
    @Generatedvalue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min=3, max = 100)
    private String name;

    @NotNull
    @Size(min=3, max = 100)
    private Srting speciality;

    @NotNull
    @Email
    private String email;

    @NotNull(message = "password cannot be null")
    @Size(min=6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
    private String password;

    @NotNull
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phone;

    @ElementCollection
    private List<String> availableTimes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Srting getSpeciality() {
        return speciality;
    }

    public void setSpeciality(Srting speciality) {
        this.speciality = speciality;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List availableTimes) {
        this.availableTimes = availableTimes;
    }

}

