function getAdminModelByData(admin) {
  const filledData = {
    lastName: admin.lastName,
    firstName: admin.firstName,
    surname: admin.surname,
    fio: `${admin.lastName} ${admin.firstName} ${admin.surname}`,
    login: admin.login,
    password: admin.password,
    phone: admin.phone,
    birthDate: admin.birthDate,
  };

  return filledData;
}

export { getAdminModelByData };
