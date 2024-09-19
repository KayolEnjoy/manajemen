// Fungsi untuk memformat angka sebagai rupiah dengan titik
function formatRupiah(angka) {
    let numberString = angka.replace(/[^,\d]/g, '').toString();
    let split = numberString.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
}

// Fungsi untuk menghilangkan titik sebelum digunakan dalam perhitungan
function unformatRupiah(angka) {
    return parseFloat(angka.replace(/\./g, ''));
}

// Event listener untuk memformat input sebagai rupiah saat mengetik
document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('keyup', function() {
        this.value = formatRupiah(this.value);
    });
});

document.getElementById('calculate-btn').addEventListener('click', function() {
    // Ambil nilai input dari form dan hilangkan format titik untuk perhitungan
    const domainCost = unformatRupiah(document.getElementById('domain-cost').value);
    const dailyOperational = unformatRupiah(document.getElementById('daily-operational').value);
    const daysNeeded = parseInt(document.getElementById('days-needed').value);
    const profitMargin = unformatRupiah(document.getElementById('profit-margin').value);
    const monthlyProfit = unformatRupiah(document.getElementById('monthly-profit').value);

    // Hitung biaya operasional pembuatan
    const operationalCost = dailyOperational * daysNeeded;
    
    // Hitung total biaya awal (modal + keuntungan)
    const totalCost = domainCost + operationalCost + profitMargin;

    // Hitung biaya bulanan
    const monthlyCost = (domainCost / 12) + dailyOperational + (monthlyProfit / 12);

    // Tampilkan hasil
    document.getElementById('total-cost').textContent = "Rp " + formatRupiah(totalCost.toString());
    document.getElementById('monthly-cost').textContent = "Rp " + formatRupiah(monthlyCost.toString());

    // Tampilkan hasil div
    document.getElementById('result').classList.remove('hidden');
});
