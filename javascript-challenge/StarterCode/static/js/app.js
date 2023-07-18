// Read in URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Get json data
d3.json(url).then(function(data) {
    console.log(data);
  });

// Create a bar chart
function horizontal_barchart(sample) {

    // Get sample data
    let sampleData = data.samples.filter(obj => obj.id === sample)[0];
    
    // Gather top 10 values for bar chart data
    let values = sampleData.sample_values.slice(0, 10).reverse();
    let labels = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    let hoverText = sampleData.otu_labels.slice(0, 10).reverse();
  
    // Build the bar chart
    let trace = {
      x: values,
      y: labels,
      text: hoverText,
      type: "bar",
      orientation: "h",
      marker: {
        color: "indianred",
        opacity: 0.85
      }
    };
  
    let barData = [trace];
    let barLayout = {
      title: "Top Ten OTU's",
    };
  
    Plotly.newPlot("bar", barData, barLayout);
  }
  
  // Create a bubble chart
  function bubble_chart(sample) {

    // Get sample data
    let sampleData = data.samples.filter(obj => obj.id === sample)[0];
  
    // Build bubble chart
    let trace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Redor",
      },
    };
  
    let bubbleData = [trace];
    let bubbleLayout = {
      title: "OTU Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" },
    };
  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }
  
  // Display sample metadata
  function sample_metadata(sample) {

    // Get the metadata for the sample
    let metadata = data.metadata.filter(obj => obj.id === parseInt(sample))[0];
    
    // Get the panel for displaying the metadata
    let metadataPanel = d3.select("#sample-metadata");
    
    // Clear existing content in the panel
    metadataPanel.html("");
    
    // Display each key-value pair
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }
  
  // Initialize the dashboard
  function init() {
    let dropdownMenu = d3.select("#selDataset");
    // Get json data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(jsonData => {
        data = jsonData;
  
        // Get names for the dropdown 
        let names = data.names;
        for (let i = 0; i < names.length; i++) {
          dropdownMenu
            .append("option")
            .text(names[i])
            .property("value", names[i]);
        }
  
        // Build the dashboard for the first sample
        let firstSample = names[0];
        horizontal_barchart(firstSample);
        bubble_chart(firstSample);
        sample_metadata(firstSample);
      });
  }
  
  // Function to update the charts and metadata when a new sample is selected
  function new_option(newSample) {
    horizontal_barchart(newSample);
    bubble_chart(newSample);
    sample_metadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  




