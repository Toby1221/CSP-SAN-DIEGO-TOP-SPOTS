$(document).ready(function() {
    //data fetch
    $.getJSON('data.json')
        //success handling
        .done(function(spotsArr){ 
            //render table
            renderSpots(spotsArr);
        })
        //error handling
        .fail(function(jqxhr, textStatus, error){
            $('#spots-table-body').html(
            '<tr><td colspan="3" class="text-red-500 text-center py-4">Error loading data: ' + textStatus + '</td></tr>'
            );
        });
});

//render function
function renderSpots(spotsArr){
    //iterating through each spot from the data.json list
    const spotsWebArr = spotsArr.map(spot => {
        //grabbing the latitude and longitude
        const latitude = spot.location[0];
        const longitude = spot.location[1]; 

        //constructing a clickable link per location lat and long
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        //poulate html table rows per spot
        return `
        <tr>
            <!--spot name-->
            <td class="px-3 py-4 text-sm font-medium accent-color">${spot.name}</td>

            <!--description (gets hidden on mobile screens-->
            <td class="px-3 py-4 text-sm text-gray-50 hidden md:table-cell">${spot.description}</td>

            <!--map button-->
            <td class="px-3 py-4 text-right text-sm font-medium">
                <a href="${mapLink}" target="_blank" class="primary-bg text-white font-bold py-1 px-3 rounded text-xs hover:primary-bg transition duration-150 inline-block">
                    View Map
                </a>
            </td>
        </tr>`;
    });

    //joining the array of html snippets together
    const allWebHtml = spotsWebArr.join('');

    //inject html into the table body
    $('#spots-table-body').html(allWebHtml);
}