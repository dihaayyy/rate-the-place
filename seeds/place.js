const mongoose = require("mongoose");
const Place = require("../models/place");

mongoose
  .connect("mongodb://127.0.0.1/rate-the-place")
  .then((result) => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

async function getRandomImage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=nature&client_id=R5kwhKyC-yrHtS7DXgvNL__5FUyui0CStzR0rYpbyn4"
  );
  const data = await response.json();
  return data.urls.regular;
}

async function sendPlace() {
  const imageUrl = await getRandomImage();
  const places = [
    {
      title: "Alun-Alun Kota Depok",
      price: "Free",
      description:
        "Alun-alun Kota Depok menjadi ruang terbuka hijau terpadu yang memiliki berbagai fasilitas umum, seperti coworking space.",
      location: "Grand Depok City, Depok",
      image: imageUrl,
    },
    {
      title: "Masjid Kubah Emas",
      price: "Free",
      description:
        "Masjid yang dibangun oleh Dian al Mahri pada sekitar tahun 2000-an dengan kubah berlapis emas.",
      location: "Cinere, Depok",
      image: imageUrl,
    },
    {
      title: "Studio Alam TVRI",
      price: "Rp5.000",
      description:
        "Tempat wisata yang di dalamnya terdapat rumah adat Indonesia dan menyediakan fasilitas berkuda.",
      location: "Cimanggis, Depok",
      image: imageUrl,
    },
    {
      title: "D'Kandang Amazing Farm",
      price: "Rp20.000",
      description:
        "Tempat wisata yang mengusung tema peternakan. Pengunjung bisa berinteraksi langsung dengan hewan ternak.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Taman Bunga Wiladatika",
      price: "Rp10.000",
      description:
        "Sebuah taman yang indah. Pengunjung bisa berfoto-foto dengan latar belakang bunga-bunga yang cantik.",
      location: "Cimanggis, Depok",
      image: imageUrl,
    },
    {
      title: "Taman Lembah Mawar",
      price: "Free",
      description:
        "Menghadirkan pemandangan rindang serta beragam fasilitas publik.",
      location: "Beji, Depok",
      image: imageUrl,
    },
    {
      title: "Kampung 99 Pepohonan",
      price: "Rp5.000",
      description:
        "Tempat wisata dengan suasana alam yang asri, menawarkan pengalaman edukatif tentang alam dan satwa.",
      location: "Limo, Depok",
      image: imageUrl,
    },
    {
      title: "Hutan Kota Depok",
      price: "Free",
      description:
        "Area hijau di tengah kota yang cocok untuk berolahraga atau sekadar bersantai.",
      location: "Beji, Depok",
      image: imageUrl,
    },
    {
      title: "Taman Wisata Pasir Putih",
      price: "Rp30.000",
      description:
        "Waterpark dengan berbagai wahana air yang seru untuk keluarga.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Green Lake View Waterpark",
      price: "Rp50.000",
      description:
        "Waterpark dengan berbagai fasilitas dan wahana air yang menyenangkan.",
      location: "Cimanggis, Depok",
      image: imageUrl,
    },
    {
      title: "Agrowisata Belimbing Dewa",
      price: "Free",
      description:
        "Wisata edukasi yang menawarkan pengalaman memetik belimbing langsung dari pohonnya.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Rafting di Sungai Ciliwung",
      price: "Rp150.000",
      description: "Pengalaman arung jeram yang menantang di Sungai Ciliwung.",
      location: "Ratujaya, Depok",
      image: imageUrl,
    },
    {
      title: "Godong Ijo",
      price: "Rp30.000",
      description:
        "Wisata edukasi dengan suasana asri, menawarkan berbagai aktivitas seperti memancing dan melihat satwa langka.",
      location: "Bojongsari, Depok",
      image: imageUrl,
    },
    {
      title: "Taman Herbal Insani",
      price: "Rp20.000",
      description:
        "Taman edukasi yang menawarkan berbagai aktivitas seperti berenang, bermain becak, dan edukasi tanaman herbal.",
      location: "Bojongsari, Depok",
      image: imageUrl,
    },
    {
      title: "Pondok Zidane",
      price: "Rp25.000",
      description:
        "Tempat wisata yang menawarkan berbagai aktivitas outbound dan permainan air.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Situ Pengasinan",
      price: "Free",
      description:
        "Danau yang menawarkan pemandangan indah, cocok untuk memancing dan bersepeda air.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Situ Cilodong",
      price: "Free",
      description:
        "Danau dengan air jernih, menawarkan berbagai aktivitas seperti berenang dan bermain perahu.",
      location: "Cilodong, Depok",
      image: imageUrl,
    },
    {
      title: "Taman Lembah Gurame",
      price: "Free",
      description:
        "Taman dengan area hijau yang luas, cocok untuk berolahraga dan bersantai.",
      location: "Pancoran Mas, Depok",
      image: imageUrl,
    },
    {
      title: "Waterpark Ceria",
      price: "Rp35.000",
      description:
        "Waterpark dengan berbagai wahana air yang seru untuk anak-anak.",
      location: "Beji, Depok",
      image: imageUrl,
    },
    {
      title: "Kolam Renang Paragon",
      price: "Rp25.000",
      description: "Kolam renang indoor yang nyaman dengan fasilitas lengkap.",
      location: "Pancoran Mas, Depok",
      image: imageUrl,
    },
    {
      title: "Kampung 3D Sukmajaya",
      price: "Free",
      description:
        "Kampung dengan berbagai lukisan tiga dimensi yang unik dan menarik untuk berfoto.",
      location: "Sukmajaya, Depok",
      image: imageUrl,
    },
    {
      title: "Rumah Keramik F Widayanto",
      price: "Rp50.000",
      description:
        "Galeri keramik yang menawarkan workshop pembuatan keramik dan pameran karya seni.",
      location: "Beji, Depok",
      image: imageUrl,
    },
    {
      title: "Saung Talaga",
      price: "Varies",
      description:
        "Restoran dengan suasana alam yang menyajikan masakan Sunda lezat.",
      location: "Sawangan, Depok",
      image: imageUrl,
    },
    {
      title: "Setu Rawa Besar Lio",
      price: "Free",
      description:
        "Danau dengan pemandangan indah, cocok untuk bersantai dan memancing.",
      location: "Pancoran Mas, Depok",
      image: imageUrl,
    },
    {
      title: "Setu Asih Pulo",
      price: "Free",
      description:
        "Danau dengan suasana sejuk dan asri, menawarkan aktivitas seperti memancing dan naik perahu bebek.",
      location: "Cipayung, Depok",
      image: imageUrl,
    },
  ];

  try {
    await Place.deleteMany({});
    await Place.insertMany(places);
    console.log("Data berhasil disimpan!");
  } catch (err) {
    console.log("Terjadi kesalahan saat menyimpan data.", err);
  } finally {
    mongoose.disconnect();
  }
}

sendPlace();
