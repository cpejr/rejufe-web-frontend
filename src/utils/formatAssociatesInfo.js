export function formatAssociatesInfoAdminRegister(associates) {
  return associates.map(({ name, cpf, status }) => ({ name, cpf, status }));
}

export function formatAssociatesInfoUserRegister(associates) {
  return associates.map(({ name,  cell_phone_number, status, allocation, acting, email }) => 
    ({ name,  cell_phone_number, status, allocation, acting, email })
  )
}