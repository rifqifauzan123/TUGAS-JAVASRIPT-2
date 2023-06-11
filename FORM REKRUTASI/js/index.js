"use strict";
		var lowonganData = ["IT SUPPORT", "Programmer", "SYS ADMIN"];

		var posisiData = ["Jakarta", "Bandung"];

		var inputData = [];

		var lowonganDropdown = document.getElementById("vacancy");
		var posisiDropdown = document.getElementById("posisi");

		var kuotaVacancy = {
			"IT SUPPORT": {
				kuota: 1,
				terisi: 0
			},
			"Programmer": {
				kuota: 2,
				terisi: 0
			},
			"SYS ADMIN": {
				kuota: 3,
				terisi: 0
			}
		};

		lowonganData.forEach(function (lowongan) {
			var option = document.createElement("option");
			option.text = lowongan;
			lowonganDropdown.appendChild(option);
		});


		posisiData.forEach(function (posisi) {
			var option = document.createElement("option");
			option.text = posisi;
			posisiDropdown.appendChild(option);
		});

		var selectElement = document.getElementById('vacancy');
		var msgVcncy = document.getElementById("alertMessage");


		selectElement.addEventListener("change", function () {
			var selectedVacancy = selectElement.value;
			msgVcncy.innerHTML = "";



			if (isValidVacancy(selectedVacancy)) {
				var lowonganInfo = getLowonganInfo(selectedVacancy);
				msgVcncy.innerHTML = lowonganInfo;
				if (lowonganInfo.includes('Kuota tersisa')) {
					msgVcncy.className = "alertMessage yellow";
				} else if (lowonganInfo.includes('Anda dapat memilih')) {
					msgVcncy.className = "alertMessage green";
				} else if (lowonganInfo.includes('Mohon maaf') || lowonganInfo.includes('Lowongan tidak tersedia')) {
					msgVcncy.className = "alertMessage red";
				}
				msgVcncy.style.display = "block";
			} else {
				msgVcncy.innerHTML = "Lowongan tidak tersedia";
			}
		});

		const form = document.getElementById("lowker");
		const bodyData = document.getElementById("bodyData");
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			const nama = document.getElementById("fullname").value;
			const email = document.getElementById("email").value;
			const phone = document.getElementById("phone").value;
			const vacancy = document.getElementById("vacancy").value;
			const posisi = document.getElementById("posisi").value;


			if (nama === "" || email === "" || phone === "" || vacancy === "" || posisi === "") {
				alert("Harap isi semua kolom!");
				return;
			}
			else if (!isValidEmail(email)) {
				alert("Harap masukan email yang sesuai!");
				return;
			}
			else if (!isValidPhoneNumber(phone)) {
				alert("Harap masukan no telp yang sesuai minimal 7 angka dan diawali 08!");
				return;
			}
			else if (!isValidVacancy(vacancy)) {

				var lowonganInfo = getLowonganInfo(vacancy);

			}
			else {
				var emailExists = inputData.some(function (item) {
					return item.email === email;
				});

				if (emailExists) {

					alert("Email sudah terdaftar");
					return;
				}

				else {

					alertMessage.innerHTML = lowonganInfo;
					inputData.push({ name: nama, email: email, phone: phone, vacancy: vacancy, posisi: posisi });
					kuotaVacancy[vacancy].terisi++;
					const successMessage = document.getElementById("successMessage");
					successMessage.innerHTML = "Terima kasih telah melakukan pengisian, permintaan anda akan kami segera proses! jumlah pelamar "
						+ vacancy + " adalah " + kuotaVacancy[vacancy].terisi + " Pelamar.";



					const newRow = document.createElement("tr");
					const namaCell = document.createElement("td");
					const emailCell = document.createElement("td");
					const phoneCell = document.createElement("td");
					const vacancyCell = document.createElement("td");
					const posisiCell = document.createElement("td");
					const clearButtonCell = document.createElement("td");



					namaCell.textContent = nama;
					emailCell.textContent = email;
					phoneCell.textContent = phone;
					vacancyCell.textContent = vacancy;
					posisiCell.textContent = posisi;



					newRow.appendChild(namaCell);
					newRow.appendChild(emailCell);
					newRow.appendChild(phoneCell);
					newRow.appendChild(vacancyCell);
					newRow.appendChild(posisiCell);


					bodyData.appendChild(newRow);


					form.reset();
					alertMessage.innerHTML = "";
					tableData.style.display = "table";
				}




			}



		});

		function clearDataTable() {
			bodyData.innerHTML = "";
			successMessage.innerHTML = "";
			alertMessage.innerHTML = "";
			inputData = [];
			tableData.style.display = "none";
		}
		function isValidEmail(email) {
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		}



		function isValidPhoneNumber(phone) {
			var phoneRegex = /^08[0-9]{7,12}$/;
			return phoneRegex.test(phone);
		}


		function getLowonganInfo(vacancy) {
			if (kuotaVacancy.hasOwnProperty(vacancy)) {
				var lowongan = kuotaVacancy[vacancy];
				if (lowongan.terisi < lowongan.kuota) {
					var tersisa = lowongan.kuota - lowongan.terisi;
					if (tersisa <= 2) {
						return 'Kuota tersisa untuk ' + vacancy + ' hanya ' + tersisa + ' pendaftar.';
					} else {
						return 'Anda dapat memilih lowongan ' + vacancy + '.';
					}
				} else {
					return 'Mohon maaf, rekrutasi untuk ' + vacancy + ' sudah penuh dan tidak dapat dipilih.';
				}
			} else {
				return 'Lowongan tidak tersedia.';
			}
		}


		function isValidVacancy(vacancy) {
			if (kuotaVacancy.hasOwnProperty(vacancy)) {
				if (kuotaVacancy[vacancy].terisi < kuotaVacancy[vacancy].kuota) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		const clearButton = document.getElementById("clearButton");
		clearButton.addEventListener("click", clearDataTable);

	