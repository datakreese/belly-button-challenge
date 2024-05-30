console.log('app.js is loaded');
// Build the metadata panel
function filterMetadataById(metadataArray, id) {
      return metadataArray.find(item => item.id == id);
  }

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    //console.log(metadata);
    // Filter the metadata for the object with the desired sample number
    const filteredData = filterMetadataById(metadata, sample);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredData).forEach(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
  });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleData = filterMetadataById(data.samples, sample);
    console.log(sampleData)
    // Filter the samples for the object with the desired sample number
    // let topTenSample = topTen(sampleData);
    

    // Get the otu_ids, otu_labels, and sample_values
    let labels = sampleData.otu_labels.slice(0, 10).reverse();
    let values = sampleData.sample_values.slice(0, 10).reverse();
    let otuIds = sampleData.otu_ids;
    let yticks = otuIds.map(ID => `OTU ID ${ID}`).slice(0, 10).reverse();
    //console.log(values)
    
    // Build a Bubble Chart
    var plotInfo = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
        color: sampleData.otu_ids,
        size: sampleData.sample_values
      }
    };

    var bubbleData = [plotInfo];
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 800,
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Number of Bacteria'}
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, layout);

   // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let title = "Top 10 Bacteria Cultures Found";
    
    var barInfo = [{
      type: 'bar',
      x: values,
      y: yticks, 
      orientation: 'h',
      text: labels
    }];

    let design = {
        title: title,
        xaxis: {title: 'Number of Bacteria'}
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", barInfo, design);
  });
  }

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  console.log(data)
    // Get the names field
    let names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");
    
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (const name of names) {
      dropdownMenu.append("option").text(name);
    }
    // Get the first sample from the list
    let first = names[0]

    // Build charts and metadata panel with the first sample
    optionChanged(first)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
//console.log(newSample)
buildCharts(newSample);
buildMetadata(newSample)
}

// Initialize the dashboard
init();
