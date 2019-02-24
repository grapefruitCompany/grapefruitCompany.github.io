<template>
  <div>
    <h1>Top 20 cryptocurrencies by market capitalization</h1>
    <table class="table">
      <thead>
        <tr>
          <th class="table__cell-top">Icon</th>
          <th class="table__cell-top">Full Name</th>
          <th class="table__cell-top">Short Name</th>
          <th class="table__cell-top">Price</th>
          <th class="table__cell-top">Supply</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cryptos" :key="item.Id">
          <td class="table__cell">
            <img
              :src="item.ImageUrl"
              width="20"
              height="20"
              alt="icon of crypro currency"
            />
          </td>
          <td class="table__cell">{{ item.FullName }}</td>
          <td class="table__cell">{{ item.Name }}</td>
          <td class="table__cell">{{ item.PRICE }}</td>
          <td class="table__cell">{{ item.SUPPLY }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService.js";

export default {
  name: "Crypto",
  data() {
    return {
      cryptos: []
    };
  },
  methods: {
    getCryptos() {
      ApiService.getMrktCap()
        .then(response => {
          //из responce нам необходимо вытянуть
          //только Id, ImageUrl, FullName, Name, PRICE, SUPPLY
          //каждой крипто валюты. Для этого проходимся по масиву
          //responce.data.Data и создаем новый масив где каждый
          //объект будет содержать нужныке нам данные
          const arr = response.data.Data.map(item => {
            let { Id, ImageUrl, FullName, Name } = item.CoinInfo,
              { PRICE, SUPPLY } = item.DISPLAY.USD;
            return {
              Id,
              ImageUrl: "https://www.cryptocompare.com" + ImageUrl,
              FullName,
              Name,
              PRICE,
              SUPPLY
            };
          });
          //теперь необходимо отсортировать массив по цене
          //так как в поле PRICE у нас строки, то используем
          //регулярные выражения, чтобы перевести их в цифры и сравнить
          arr.sort(function(a, b) {
            let num1 = parseFloat(a.PRICE.match(/\d*\.*\d*/g).join("")),
              num2 = parseFloat(b.PRICE.match(/\d*\.*\d*/g).join(""));
            if (num1 > num2) return -1;
            if (num1 < num2) return 1;
          });
          this.cryptos = arr;
        })
        .catch(error => {
          console.log("There was an arror:", error.response);
        });
    },
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.getCryptos();
      }, 300000);
    }
  },
  created() {
    this.getCryptos();
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  }
};
</script>

<style scoped lang="scss"></style>
