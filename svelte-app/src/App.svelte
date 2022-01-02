<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";

  let count = liveQuery(() => db.plays.count());

  let files;
  let query;
  let queryResult;

  async function getJSON(blob) {
    const text = await blob.text();
    return JSON.parse(text);
  }

  async function loadFiles() {
    for (const file of files) {
      const plays = await getJSON(file);
      for (let play of plays) {
        if (play.ts) {
          play.ts = play.ts.replace(" UTC", "Z");
        }
      }
      await db.plays.bulkAdd(plays);
    }
  }

  async function runQuery() {
    try {
      return eval(query);
    } catch (error) {
      return error;
    }
  }
</script>

<div class="mx-auto max-w-lg mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
  <div class="align-middle mx-auto">
    <input type="file" accept=".json" multiple bind:files>

    {#if files && files[0]}
    {#await loadFiles()}
      <p>
        Loading files..
      </p>
    {:then text}
      <p>
        {text}
      </p>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
    {/if}

    {$count == null ? "" : $count + " plays loaded"}
  </div>

  <textarea bind:value={query} on:input={() => queryResult = runQuery()}></textarea>

  {#if query}
  {#await queryResult}
    <p>
      Evaluating..
    </p>
  {:then text}
    <p>
      {text}
    </p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  {/if}
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(body) {
    @apply bg-blue-500;
  }
</style>
