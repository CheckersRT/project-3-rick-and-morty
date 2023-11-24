function navPagination() {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.setAttribute("data-js", "pagination");
  return pagination;
}

export default navPagination;
