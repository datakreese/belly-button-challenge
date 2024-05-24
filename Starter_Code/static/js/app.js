// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    function filterMetadataById(metadataArray, id) {
      return metadataArray.filter(item => item.id === id);
  }
    const filteredData = filterMetadataById(metadata, sample);
    console.log(filteredData);
    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredData[0]).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
  });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleData = data.samples.find(entry => entry.id === sample);

    // Filter the samples for the object with the desired sample number
    // let topTenSample = topTen(sampleData);
    let topTenSample = samplesData.slice(0, 10);

    // Get the otu_ids, otu_labels, and sample_values
    let labels = topTenSample.map(sample => sample.otu_labels);
    let values = topTenSample.map(sample => sample.sample_values);
    let otuIds = topTenSample.map(sample => sample.otu_ids);
    
    // Build a Bubble Chart
    var plotInfo = {
      x: otuIds,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: values
      }
    };

    var data = [plotInfo];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600
    };

    // Render the Bubble Chart
    Plotly.newPlot('myDiv', data, layout);
  });
}
//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
//     let title = "Top 10 Bacteria Cultures Found";
//     let timesRead = [100, 50, 25];
//     let trace1 = {
//       x: books,
//       y: timesRead,
//       type: 'bar'
//     };
    
//     let data = [trace1];

//     let layout = {
//         title: title
//     };

//     // Build a Bar Chart
//     // Don't forget to slice and reverse the input data appropriately


//     // Render the Bar Chart
//     Plotly.newPlot("plot", data, layout);
//   });
// }

// // Function to run on page load
// function init() {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // Get the names field
//     let names = d3.select(".names")

//     // Use d3 to select the dropdown with id of `#selDataset`
//     let dropdownMenu = d3.select("#selDataset").on("change", getData);
//     let dataset = dropdownMenu.property("value");
//     // Use the list of sample names to populate the select options
//     // Hint: Inside a loop, you will need to use d3 to append a new
//     // option for each sample name.
//     function getData() {
    
//       // Assign the value of the dropdown menu option to a variable
//       let dataset = dropdownMenu.property("value");
    
//       let newdata = [];
    
//       if (dataset == 'australia') {
//         newdata = australia;
//       }
//       else if (dataset == 'brazil') {
//         newdata = brazil;
//       }
//       else if (dataset == 'uk') {
//         newdata = uk;
//       }
//       else if (dataset == 'mexico') {
//         newdata = mexico;
//       }
//       else if (dataset == 'singapore') {
//         newdata = singapore;
//       }
//       else if (dataset == 'southAfrica') {
//         newdata = southAfrica;
//       }
    
//       // Call function to update the chart
//       updatePlotly(newdata);
//     }
    
//     // Update the restyled plot's values
//     function updatePlotly(newdata) {
//       Plotly.restyle("pie", "values", [newdata]);
//     }
    
//     init();
    
    

//     // Get the first sample from the list


//     // Build charts and metadata panel with the first sample

//   });
// }

// // Function for event listener
// function optionChanged(newSample) {
//   // Build charts and metadata panel each time a new sample is selected
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);

// }

// // Initialize the dashboard
// init();
