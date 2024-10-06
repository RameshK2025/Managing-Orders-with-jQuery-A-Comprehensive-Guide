 $(document).ready(function() {
            // Add Order functionality
            $('#addOrderBtn').click(function() {
                $('#orderTable tbody').prepend(`
                    <tr>
                        <td><input type="text" class="orderId"></td>
                        <td><input type="number" class="orderValue"></td>
                        <td><input type="number" class="orderQuantity"></td>
                        <td><button class="addBtn">Add</button></td>
                    </tr>
                `);
            });

            $(document).on('click', '.addBtn', function() {
                var row = $(this).closest('tr');
                var orderId = row.find('.orderId').val();
                var orderValue = row.find('.orderValue').val();
                var orderQuantity = row.find('.orderQuantity').val();

                row.html(`
                    <td>${orderId}</td>
                    <td>${orderValue}</td>
                    <td>${orderQuantity}</td>
                    <td>
                        <button class="editBtn">Edit</button>
                        <button class="deleteBtn">Delete</button>
                    </td>
                `);
                saveOrders();
            });

            // Filter Orders functionality
            $('#filterSlider').on('input', function() {
                var filterValue = $(this).val();
                $('#orderTable tbody tr').each(function() {
                    var orderValue = $(this).find('td:nth-child(2)').text();
                    if (parseFloat(orderValue) > filterValue) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });

            // Save Orders to local storage
            function saveOrders() {
                var orders = [];
                $('#orderTable tbody tr').each(function() {
                    var orderId = $(this).find('td:nth-child(1)').text();
                    var orderValue = $(this).find('td:nth-child(2)').text();
                    var orderQuantity = $(this).find('td:nth-child(3)').text();
                    if (orderId && orderValue && orderQuantity) {
                        orders.push({
                            orderId: orderId,
                            orderValue: orderValue,
                            orderQuantity: orderQuantity
                        });
                    }
                });
                localStorage.setItem('orders', JSON.stringify(orders));
            }

            // Load Orders from local storage
            function loadOrders() {
                var orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.forEach(function(order) {
                    $('#orderTable tbody').append(`
                        <tr>
                            <td>${order.orderId}</td>
                            <td>${order.orderValue}</td>
                            <td>${order.orderQuantity}</td>
                            <td>
                                <button class="editBtn">Edit</button>
                                <button class="deleteBtn">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }

            loadOrders();

            // Edit Order functionality
            $(document).on('click', '.editBtn', function() {
                var row = $(this).closest('tr');
                var orderId = row.find('td:nth-child(1)').text();
                var orderValue = row.find('td:nth-child(2)').text();
                var orderQuantity = row.find('td:nth-child(3)').text();

                row.html(`
                    <td><input type="text" class="orderId" value="${orderId}"></td>
                    <td><input type="number" class="orderValue" value="${orderValue}"></td>
                    <td><input type="number" class="orderQuantity" value="${orderQuantity}"></td>
                    <td><button class="saveBtn">Save</button></td>
                `);
            });

            $(document).on('click', '.saveBtn', function() {
                var row = $(this).closest('tr');
                var orderId = row.find('.orderId').val();
                var orderValue = row.find('.orderValue').val();
                var orderQuantity = row.find('.orderQuantity').val();

                row.html(`
                    <td>${orderId}</td>
                    <td>${orderValue}</td>
                    <td>${orderQuantity}</td>
                    <td>
                        <button class="editBtn">Edit</button>
                        <button class="deleteBtn">Delete</button>
                    </td>
                `);
                saveOrders();
            });

            // Delete Order functionality
            $(document).on('click', '.deleteBtn', function() {
                $(this).closest('tr').remove();
                saveOrders();
            });

            // Search functionality
            $('#searchInput').on('keyup', function() {
                var searchValue = $(this).val().toLowerCase();
                $('#orderTable tbody tr').each(function() {
                    var orderId = $(this).find('td:first').text().toLowerCase();
                    if (orderId.includes(searchValue)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        });
// $(document).ready(function() {
//     // Add Order functionality
//     $('#addOrderButton').on('click', function() {
//         var newRow = '<tr>' +
//             '<td><input type="text" class="orderId"></td>' +
//             '<td><input type="text" class="orderValue"></td>' +
//             '<td><input type="text" class="orderQuantity"></td>' +
//             '<td><button class="addButton">Add</button></td>' +
//             '</tr>';
//         $('#orderTable tbody').prepend(newRow);
//     });

//     // Save Order functionality
//     $(document).on('click', '.addButton', function() {
//         var row = $(this).closest('tr');
//         var orderId = row.find('.orderId').val();
//         var orderValue = row.find('.orderValue').val();
//         var orderQuantity = row.find('.orderQuantity').val();

//         var orderData = {
//             id: orderId,
//             value: orderValue,
//             quantity: orderQuantity
//         };

//         var jsonData = JSON.stringify(orderData);
//         localStorage.setItem(orderId, jsonData);

//         row.html('<td>' + orderId + '</td>' +
//                  '<td>' + orderValue + '</td>' +
//                  '<td>' + orderQuantity + '</td>' +
//                  '<td><button class="editButton">Edit</button> <button class="deleteButton">Delete</button></td>');
//     });

//     // Edit Order functionality
//     $(document).on('click', '.editButton', function() {
//         var row = $(this).closest('tr');
//         var orderId = row.find('td:eq(0)').text();
//         var orderValue = row.find('td:eq(1)').text();
//         var orderQuantity = row.find('td:eq(2)').text();

//         row.html('<td><input type="text" class="orderId" value="' + orderId + '"></td>' +
//                  '<td><input type="text" class="orderValue" value="' + orderValue + '"></td>' +
//                  '<td><input type="text" class="orderQuantity" value="' + orderQuantity + '"></td>' +
//                  '<td><button class="saveButton">Save</button></td>');
//     });

//     // Save edited Order functionality
//     $(document).on('click', '.saveButton', function() {
//         var row = $(this).closest('tr');
//         var orderId = row.find('.orderId').val();
//         var orderValue = row.find('.orderValue').val();
//         var orderQuantity = row.find('.orderQuantity').val();

//         var orderData = {
//             id: orderId,
//             value: orderValue,
//             quantity: orderQuantity
//         };

//         var jsonData = JSON.stringify(orderData);
//         localStorage.setItem(orderId, jsonData);

//         row.html('<td>' + orderId + '</td>' +
//                  '<td>' + orderValue + '</td>' +
//                  '<td>' + orderQuantity + '</td>' +
//                  '<td><button class="editButton">Edit</button> <button class="deleteButton">Delete</button></td>');
//     });

//     // Delete Order functionality
//     $(document).on('click', '.deleteButton', function() {
//         var row = $(this).closest('tr');
//         var orderId = row.find('td:eq(0)').text();
//         localStorage.removeItem(orderId);
//         row.remove();
//     });

//     // Load saved orders on page load
//     for (var i = 0; i < localStorage.length-1; i++) {
//         var key = localStorage.key(i);
//         alert(key)
//         var orderData = JSON.parse(localStorage.getItem(key));

//         var newRow = '<tr>' +
//             '<td>' + orderData.id + '</td>' +
//             '<td>' + orderData.value + '</td>' +
//             '<td>' + orderData.quantity + '</td>' +
//             '<td><button class="editButton">Edit</button> <button class="deleteButton">Delete</button></td>' +
//             '</tr>';
//         $('#orderTable tbody').append(newRow);
//     }
// });
