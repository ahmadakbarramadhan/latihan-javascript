function senddata() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/employees/post";

    var data = JSON.stringify({
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone").value,
        hireDate: document.getElementById("hiredate").value,
        jobId: document.getElementById("job").value,
        salary: document.getElementById("salary").value,
        commissionPct: document.getElementById("comm").value,
        managerId: document.getElementById("mgrid").value,
        departmentId: document.getElementById("deptid").value
    });
    console.log(data);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
        }
    };
    xhr.onloadend = function () {
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        message = response.message;
        console.log("message");

        if (response.data !== null) {
            var success = alert("Data berhasil di input");
            firstName: document.getElementById("fname").value = "";
            lastName: document.getElementById("lname").value = "";
            email: document.getElementById("email").value = "";
            phoneNumber: document.getElementById("phone").value = "";
            hireDate: document.getElementById("hiredate").value = "";
            jobId: document.getElementById("job").value = "";
            salary: document.getElementById("salary").value = "";
            commissionPct: document.getElementById("comm").value = "";
            managerId: document.getElementById("mgrid").value = "";
            departmentId: document.getElementById("deptid").value = "";
            window.location.href = "employees.html";
        } else {
            var fail = alert(message);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(data);
    return false;
}

function fetchdata() {
    clearresult()
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/employees/findAll";

    xhr.onloadend = function () {

        if (this.responseText !== "") {
            var restext = JSON.parse(this.responseText);
            var result = restext.data;
            console.log(restext, result);

            for (let i = 0; i < result.length; i++) {
                var row = document.createElement("tr");
                var col1 = document.createElement("td");
                var col2 = document.createElement("td");
                var col3 = document.createElement("td");
                var col4 = document.createElement("td");
                var col5 = document.createElement("td");
                var col6 = document.createElement("td");
                var col7 = document.createElement("td");
                var col8 = document.createElement("td");
                var col9 = document.createElement("td");
                var col10 = document.createElement("td");
                var col11 = document.createElement("td");
                var col12 = document.createElement("td");
                var col13 = document.createElement("td");
                col1.innerHTML = result[i].employeeId;
                col2.innerHTML = result[i].firstName;
                col3.innerHTML = result[i].lastName;
                col4.innerHTML = result[i].email;
                col5.innerHTML = result[i].phoneNumber;
                col6.innerHTML = result[i].hireDate;
                col7.innerHTML = result[i].jobId;
                col8.innerHTML = result[i].salary;
                col9.innerHTML = result[i].commissionPct;
                col10.innerHTML = result[i].managerId;
                col11.innerHTML = result[i].departmentId;
                col12.innerHTML = `<a href='#' onclick='deletedata(${result[i].employeeId})'> Delete </a>`;
                col13.innerHTML = `<a href='update-employees.html?id=${result[i].employeeId}'> Edit </a>`;
                row.append(col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13);
                document.getElementById("tabel").append(row);
            }
            document.getElementById("button").innerHTML = "Fetch again";
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function updatedata() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/employees/put";

    var data = JSON.stringify({
        employeeId: new URL(window.location).searchParams.get("id"),
        firstName: document.getElementById("new_fname").value,
        lastName: document.getElementById("new_lname").value,
        email: document.getElementById("new_email").value,
        phoneNumber: document.getElementById("new_phone").value,
        hireDate: document.getElementById("new_hiredate").value,
        jobId: document.getElementById("new_job").value,
        salary: document.getElementById("new_salary").value,
        commissionPct: document.getElementById("new_comm").value,
        managerId: document.getElementById("new_mgrid").value,
        departmentId: document.getElementById("new_deptid").value
    });
    console.log(data);

    xhr.onloadend = function () {
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        message = response.message;
        console.log("message");

        if (response.data !== null) {
            var success = alert("Data berhasil di update");
            firstName: document.getElementById("new_fname").value = "";
            lastName: document.getElementById("new_lname").value = "";
            email: document.getElementById("new_email").value = "";
            phoneNumber: document.getElementById("new_phone").value = "";
            hireDate: document.getElementById("new_hiredate").value = "";
            jobId: document.getElementById("new_job").value = "";
            salary: document.getElementById("new_salary").value = "";
            commissionPct: document.getElementById("new_comm").value = "";
            managerId: document.getElementById("new_mgrid").value = "";
            departmentId: document.getElementById("new_deptid").value = "";
            window.location.href = "employees.html";
        } else {
            var fail = alert(message);
        }
    };

    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
}

function clearresult() {
    document.getAnimations("clear").innerHTML;
    document.getElementById("tabel").innerHTML =
        "<tr><thead><th>Employee ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone Number<th>Hire Date</th><th>Job ID</th><th>Salary</th><th>Commission PCT</th><th>Manager ID</th><th>Department ID</th><th colspan=2>Action</th></thead></tr>";
}

function deletedata(i) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9090/employees/" + i;
    confirmation = confirm("Yakin ingin menghapus data employee dengan ID " + i);
    if (confirmation) {
        xhr.open("DELETE", url, true);
        xhr.send();
        fetchdata();
    } else {
        fetchdata();
    }

}


function getbyid() {
    var xhr = new XMLHttpRequest();
    var i = document.getElementById("employeeid").value;
    var url = "http://localhost:9090/employees/getById?id=" + i;

    xhr.onloadend = function () {

        if (this.responseText !== "") {
            clearresult();
            var restext = JSON.parse(this.responseText);
            var result = restext.data;
            console.log(restext, result);

            var row = document.createElement("tr");
            var col1 = document.createElement("td");
            var col2 = document.createElement("td");
            var col3 = document.createElement("td");
            var col4 = document.createElement("td");
            var col5 = document.createElement("td");
            var col6 = document.createElement("td");
            var col7 = document.createElement("td");
            var col8 = document.createElement("td");
            var col9 = document.createElement("td");
            var col10 = document.createElement("td");
            var col11 = document.createElement("td");
            var col12 = document.createElement("td");
            var col13 = document.createElement("td");
            col1.innerHTML = result.employeeId;
            col2.innerHTML = result.firstName;
            col3.innerHTML = result.lastName;
            col4.innerHTML = result.email;
            col5.innerHTML = result.phoneNumber;
            col6.innerHTML = result.hireDate;
            col7.innerHTML = result.jobId;
            col8.innerHTML = result.salary;
            col9.innerHTML = result.commissionPct;
            col10.innerHTML = result.managerId;
            col11.innerHTML = result.departmentId;
            col12.innerHTML = `<a href='#' onclick='deletedata(${result.employeeId})'> Delete </a>`;
            col13.innerHTML = `<a href='#' onclick='updatedata(${result.employeeId})'> Edit </a>`;
            row.append(col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13);
            document.getElementById("tabel").append(row);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    return false;
}