// Call back to donor_projects() function in school_donations.py
queue()
    .defer(d3.json, "/donorsUS/projects")
    .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    // Clean projectsJson data so all projects from same month have
    // same datetime value and total_donations is a number
    var donorsUSProjects = projectsJson;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsUSProjects.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
    });


    // Create a Crossfilter instance based on the dataset
    var donor_crossfilter = crossfilter(donorsUSProjects);

    // Define Dimensions
    var dateDim = donor_crossfilter.dimension(function (d) {
        return d["date_posted"];
    });
    var resourceTypeDim = donor_crossfilter.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyLevelDim = donor_crossfilter.dimension(function (d) {
        return d["poverty_level"];
    });
    var stateDim = donor_crossfilter.dimension(function (d) {
        return d["school_state"];
    });
    var fundingStatus = donor_crossfilter.dimension(function (d) {
        return d["funding_status"];
    });
    var primaryFocusSubjectDim = donor_crossfilter.dimension(function (d) {
        return d["primary_focus_subject"];
    });
    var gradeLevelDim = donor_crossfilter.dimension(function (d) {
        return d["grade_level"];
    });
    var schoolMetroDim = donor_crossfilter.dimension(function (d) {
        return d["school_metro"];
    });
    var primaryFocusAreaDim = donor_crossfilter.dimension(function (d) {
        return d["primary_focus_area"];
    });


    // Calculate metrics for grouping and counting data
    var numProjectsByDate = dateDim.group();
    var numProjectsByResourceType = resourceTypeDim.group();
    var numProjectsByPovertyLevel = povertyLevelDim.group();
    var numProjectsByFundingStatus = fundingStatus.group();
    var totalDonationsByState = stateDim.group().reduceSum(function (d) {
        return d["total_donations"];
    });
    var stateGroup = stateDim.group();
    var totalSchoolDistrict = donor_crossfilter.groupAll().reduceSum(function (d) {  // returns length of school_district array
        return d["school_district"].length;
    });
    var numProjectsByPrimaryFocusSubject = primaryFocusSubjectDim.group();
    var numProjectsByGradeLevel = gradeLevelDim.group();
    var numProjectsBySchoolMetro = schoolMetroDim.group();
    var numProjectsByPrimaryFocusArea = primaryFocusAreaDim.group();
    var totalProjects = donor_crossfilter.groupAll();
    var totalDonations = donor_crossfilter.groupAll().reduceSum(function (d) {
        return d["total_donations"];
    });
    var max_state = totalDonationsByState.top(1)[0].value;


    // Define values to determine the first and last dates
    // used to create the Time Chart
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];

    // Charts
    var timeChart = dc.barChart("#time-chart");
    var resourceTypeRowChart = dc.rowChart("#resource-type-row-chart");
    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
    var fundingStatusPieChart = dc.pieChart("#funding-pie-chart");
    var totalSchoolDistrictND = dc.numberDisplay("#total-school-district-nd");
    var primaryFocusSubjectRowChart = dc.rowChart("#primary-focus-subject-row-chart");
    var povertyLevelPieChart = dc.pieChart("#poverty-level-pie-chart");
    var gradeLevelPieChart = dc.pieChart("#grade-level-pie-chart");
    var schoolMetroPieChart = dc.pieChart("#school-metro-pie-chart");
    var primaryFocusAreaRowChart = dc.rowChart("#primary-focus-area-row-chart");


    // Assign properties and values to charts
    selectField = dc.selectMenu('#menu-select')
        .dimension(stateDim)
        .group(stateGroup);

    totalSchoolDistrictND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalSchoolDistrict)
        .formatNumber(d3.format(".3s"));

    numberProjectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalProjects)
        .formatNumber(d3.format(".3s"));

    totalDonationsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format(".3s"));

    timeChart
        .width(860)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(numProjectsByDate)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    fundingStatusPieChart
        .height(200)
        .radius(90)
        .innerRadius(0)
        .renderTitle(false)
        .transitionDuration(1500)
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus)
        .ordinalColors(['#e63032', '#ec5e60', '#f18c8d']);

    gradeLevelPieChart
        .height(230)
        .radius(100)
        .transitionDuration(1800)
        .dimension(gradeLevelDim)
        .group(numProjectsByGradeLevel)
        .externalLabels(20)
        .ordinalColors(['#f3cc28', '#f4d240', '#f5d758', '#f7dd70']);

    povertyLevelPieChart
        .height(230)
        .radius(100)
        .transitionDuration(2000)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .externalLabels(10);

    schoolMetroPieChart
        .height(230)
        .radius(100)
        .transitionDuration(2500)
        .dimension(schoolMetroDim)
        .group(numProjectsBySchoolMetro)
        .externalLabels(20)
        .ordinalColors(['#76b32f', '#85bb46', '#94c45d', '#a3cc74']);

    primaryFocusSubjectRowChart
        .width(720)
        .height(550)
        .renderTitle(false)
        .dimension(primaryFocusSubjectDim)
        .group(numProjectsByPrimaryFocusSubject)
        .xAxis().ticks(8);

    resourceTypeRowChart
        .width(320)
        .height(200)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .xAxis().ticks(4);

    primaryFocusAreaRowChart
        .width(320)
        .height(200)
        .dimension(primaryFocusAreaDim)
        .group(numProjectsByPrimaryFocusArea)
        .xAxis().ticks(4);

    // Render charts last, otherwise the charts will attempt to render with incomplete data
    dc.renderAll();
}