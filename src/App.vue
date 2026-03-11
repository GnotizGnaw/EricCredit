<template>
  <div class="min-h-screen bg-slate-900 text-white p-6 font-sans">
    <header class="text-center mb-10">
      <h1 class="text-2xl opacity-80 mb-2">Eric's Credit Bank</h1>
      <div class="text-6xl font-bold text-green-400 drop-shadow-lg">
        {{ balance }} <span class="text-xl text-slate-400">CR</span>
      </div>
    </header>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <section class="bg-slate-800 p-6 rounded-3xl border-t-4 border-green-500 shadow-xl">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          🚀 Earn Credits
        </h2>
        <div class="space-y-3">
          <button 
            v-for="task in config.earning_tasks" 
            :key="task.id"
            @click="updateBalance(task.value, task.label)"
            class="w-full flex justify-between items-center p-4 bg-slate-700 hover:bg-slate-600 active:scale-95 transition rounded-2xl"
          >
            <span>{{ task.label }}</span>
            <span class="font-bold text-green-400">+{{ task.value }}</span>
          </button>
        </div>
      </section>

      <section class="bg-slate-800 p-6 rounded-3xl border-t-4 border-red-500 shadow-xl">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          🛒 Reward Shop
        </h2>
        <div class="space-y-3">
          <button 
            v-for="reward in config.spending_rewards" 
            :key="reward.id"
            @click="updateBalance(-reward.value, reward.label)"
            :disabled="balance < reward.value"
            class="w-full flex justify-between items-center p-4 bg-slate-700 hover:bg-slate-600 active:scale-95 transition rounded-2xl disabled:opacity-30 disabled:grayscale"
          >
            <span>{{ reward.label }}</span>
            <span class="font-bold text-red-400">-{{ reward.value }}</span>
          </button>
        </div>
      </section>

    </div>

    <footer class="max-w-4xl mx-auto mt-10">
      <h3 class="text-slate-500 uppercase text-sm font-bold mb-3 tracking-widest">Recent Activity</h3>
      <div class="bg-slate-800/50 rounded-xl p-4 h-48 overflow-y-auto space-y-2">
        <div v-for="(log, i) in history" :key="i" class="text-sm flex justify-between border-b border-slate-700 pb-1">
          <span class="text-slate-400">{{ log.time }}</span>
          <span :class="log.amount > 0 ? 'text-green-400' : 'text-red-400'">
            {{ log.action }} ({{ log.amount > 0 ? '+' : '' }}{{ log.amount }})
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import configData from './config.json'; // Importing local config

const balance = ref(0);
const history = ref([]);
const config = ref(configData);

onMounted(() => {
  const savedBalance = localStorage.getItem('eric_balance');
  if (savedBalance) balance.value = parseInt(savedBalance);
  
  const savedHistory = localStorage.getItem('eric_history');
  if (savedHistory) history.value = JSON.parse(savedHistory);
});

const updateBalance = (amount, action) => {
  balance.value += amount;
  
  // Add to history
  const entry = {
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action,
    amount
  };
  history.value.unshift(entry);
  if (history.value.length > 10) history.value.pop();

  // Persist
  localStorage.setItem('eric_balance', balance.value);
  localStorage.setItem('eric_history', JSON.stringify(history.value));
};
</script>