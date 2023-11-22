function navPagination(page, maxPage) {
    const pagination = document.createElement("span");
    pagination.classList.add("navigation__pagination");
    pagination.setAttribute("data-js", "pagination");
    pagination.textContent = `${page}/${maxPage}`
    return pagination
}

export default navPagination