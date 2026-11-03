<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "information_schema";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";

    $sql = "SELECT * FROM `COLLATIONS`";
    // Execute the SQL query
    $result = $conn->query($sql);

    // Process the result set
    if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["ID"]. " - Name: " . $row["COLLATION_NAME"]. " " . $row["CHARACTER_SET_NAME"]. "<br>";
    }
    } else {
    echo "0 results";
    }
$conn->close();
?>