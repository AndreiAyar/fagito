<script>
    import { page } from '$app/stores';
  </script>
  
  <h1>Err{$page.status}: {$page?.error?.message}</h1>