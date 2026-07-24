-- Allow admins to delete orders (order_items cascade automatically)
create policy "Admins can delete orders" on public.orders
  for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
