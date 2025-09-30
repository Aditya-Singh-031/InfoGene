
// Gene Analysis Platform JavaScript - Enhanced with Live API Integration
class GeneAnalysisPlatform {
    constructor() {
        this.currentGene = null;
        this.isAnalyzing = false;
        this.progressStep = 0;
        this.nglStage = null;
        this.geneData = null;
        this.sequenceData = null;
        this.exonData = null;

        // API Configuration
        this.apis = {
            ncbi: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/',
            ensembl: 'https://rest.ensembl.org',
            uniprot: 'https://rest.uniprot.org',
            alphafold: 'https://alphafold.ebi.ac.uk/api'
        };

        this.searchStrategies = [
            "Initializing analysis...",
            "Resolving gene symbol/ID via NCBI...",
            "Fetching gene information from NCBI Gene database...",
            "Retrieving genomic sequences from NCBI Nuccore...",
            "Querying Ensembl for transcript and exon data...",
            "Searching UniProt for protein information...",
            "Loading AlphaFold protein structures...",
            "Finalizing analysis and generating outputs..."
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCollapsibleSections();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('gene-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.startAnalysis();
            });
        }

        // Retry button
        const retryBtn = document.getElementById('retry-analysis');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.resetAnalysis();
            });
        }

        // Toast close button
        const toastClose = document.getElementById('toast-close');
        if (toastClose) {
            toastClose.addEventListener('click', () => {
                this.hideToast();
            });
        }

        this.setupToastAutoHide();
    }

    setupToastAutoHide() {
        let toastTimeout;
        const toast = document.getElementById('toast');
        if (!toast) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (toast.classList.contains('show')) {
                        clearTimeout(toastTimeout);
                        toastTimeout = setTimeout(() => {
                            this.hideToast();
                        }, 5000);
                    }
                }
            });
        });

        observer.observe(toast, { attributes: true });
    }

    setupCollapsibleSections() {
        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                const content = document.getElementById(target);
                const icon = e.currentTarget.querySelector('.collapse-icon');

                if (!content || !icon) return;

                if (content.classList.contains('collapsed')) {
                    content.classList.remove('collapsed');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '−';
                    btn.classList.remove('collapsed');
                } else {
                    content.classList.add('collapsed');
                    content.style.maxHeight = '0px';
                    icon.textContent = '+';
                    btn.classList.add('collapsed');
                }
            });
        });
    }

    async startAnalysis() {
        if (this.isAnalyzing) return;

        const geneInput = document.getElementById('gene-input');
        const emailInput = document.getElementById('email-input');

        if (!geneInput || !emailInput) {
            this.showError('Form elements not found');
            return;
        }

        const geneValue = geneInput.value.trim().toUpperCase();
        const emailValue = emailInput.value.trim();

        if (!this.validateInputs(geneValue, emailValue)) return;

        this.isAnalyzing = true;
        this.currentGene = geneValue;

        try {
            this.showLoadingState();
            await this.runAnalysisSteps();
            this.displayResults();
            this.showSuccessToast('Analysis completed successfully!');
        } catch (error) {
            console.error('Analysis error:', error);
            this.showError(`Analysis failed: ${error.message}. Please check the gene symbol/ID and try again.`);
        } finally {
            this.isAnalyzing = false;
        }
    }

    validateInputs(geneInput, emailInput) {
        if (!geneInput) {
            this.showError('Please enter a gene symbol or NCBI Gene ID.');
            return false;
        }

        if (!emailInput) {
            this.showError('Email address is required for NCBI API compliance.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            this.showError('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    async runAnalysisSteps() {
        const progressSteps = document.getElementById('progress-steps');
        const progressFill = document.getElementById('progress-fill');

        if (!progressSteps || !progressFill) {
            throw new Error('Progress elements not found');
        }

        progressSteps.innerHTML = '';

        for (let i = 0; i < this.searchStrategies.length; i++) {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'progress-step active';
            stepDiv.innerHTML = `${this.searchStrategies[i]}`;
            progressSteps.appendChild(stepDiv);

            const progress = ((i + 1) / this.searchStrategies.length) * 100;
            progressFill.style.width = `${progress}%`;

            // Execute actual API calls based on step
            try {
                switch(i) {
                    case 0:
                        // Initialize
                        await this.delay(300);
                        break;
                    case 1:
                        // Resolve gene symbol/ID
                        this.geneData = await this.resolveGeneIdentifier(this.currentGene);
                        break;
                    case 2:
                        // Fetch gene information
                        await this.fetchGeneDetails();
                        break;
                    case 3:
                        // Retrieve genomic sequences
                        await this.fetchGenomicSequences();
                        break;
                    case 4:
                        // Query Ensembl for transcripts/exons
                        await this.fetchEnsemblData();
                        break;
                    case 5:
                        // Search UniProt
                        await this.fetchUniProtData();
                        break;
                    case 6:
                        // Load AlphaFold structures
                        await this.fetchAlphaFoldStructures();
                        break;
                    case 7:
                        // Finalize
                        await this.delay(200);
                        break;
                }
            } catch (error) {
                console.warn(`Step ${i} warning:`, error.message);
                // Continue with next step even if one fails
            }

            // Mark step as completed
            await this.delay(300);
            stepDiv.classList.remove('active');
            stepDiv.classList.add('completed');
        }
    }

    async resolveGeneIdentifier(input) {
        const emailInput = document.getElementById('email-input');
        const email = emailInput ? emailInput.value.trim() : 'user@example.com';

        // Try to determine if input is a gene symbol or gene ID
        const isNumeric = /^\d+$/.test(input);

        let searchQuery;
        if (isNumeric) {
            // Input appears to be a Gene ID
            searchQuery = `${input}[Gene ID]`;
        } else {
            // Input appears to be a gene symbol
            searchQuery = `${input}[Gene Name] AND Homo sapiens[Organism]`;
        }

        const url = `${this.apis.ncbi}esearch.fcgi?db=gene&term=${encodeURIComponent(searchQuery)}&email=${email}&retmax=1&retmode=json`;

        const response = await this.fetchWithRetry(url);
        const data = await response.json();

        if (!data.esearchresult || !data.esearchresult.idlist || data.esearchresult.idlist.length === 0) {
            throw new Error(`Gene "${input}" not found in NCBI Gene database`);
        }

        const geneId = data.esearchresult.idlist[0];
        return { geneId, originalInput: input };
    }

    async fetchGeneDetails() {
        if (!this.geneData || !this.geneData.geneId) {
            throw new Error('Gene ID not available for detailed fetch');
        }

        const emailInput = document.getElementById('email-input');
        const email = emailInput ? emailInput.value.trim() : 'user@example.com';

        const url = `${this.apis.ncbi}esummary.fcgi?db=gene&id=${this.geneData.geneId}&email=${email}&retmode=json`;

        const response = await this.fetchWithRetry(url);
        const data = await response.json();

        if (!data.result || !data.result[this.geneData.geneId]) {
            throw new Error('Failed to fetch gene details from NCBI');
        }

        const geneInfo = data.result[this.geneData.geneId];

        this.geneData = {
            ...this.geneData,
            symbol: geneInfo.name || this.geneData.originalInput,
            description: geneInfo.description || 'No description available',
            organism: geneInfo.organism?.scientificname || 'Homo sapiens',
            chromosome: this.extractChromosome(geneInfo),
            location: geneInfo.maplocation || 'Unknown',
            aliases: this.extractAliases(geneInfo),
            function: geneInfo.summary || 'Function not available'
        };
    }

    async fetchGenomicSequences() {
        if (!this.geneData || !this.geneData.geneId) return;

        const emailInput = document.getElementById('email-input');
        const email = emailInput ? emailInput.value.trim() : 'user@example.com';

        // Use ELink to find associated nucleotide sequences
        const linkUrl = `${this.apis.ncbi}elink.fcgi?dbfrom=gene&db=nuccore&id=${this.geneData.geneId}&email=${email}&retmode=json`;

        try {
            const linkResponse = await this.fetchWithRetry(linkUrl);
            const linkData = await linkResponse.json();

            let nucleotideIds = [];
            if (linkData.linksets && linkData.linksets[0] && linkData.linksets[0].linksetdbs) {
                const linksetdb = linkData.linksets[0].linksetdbs.find(ls => ls.dbto === 'nuccore');
                if (linksetdb && linksetdb.links) {
                    nucleotideIds = linksetdb.links.slice(0, 5); // Limit to first 5
                }
            }

            if (nucleotideIds.length > 0) {
                // Fetch summaries for these sequences
                const summaryUrl = `${this.apis.ncbi}esummary.fcgi?db=nuccore&id=${nucleotideIds.join(',')}&email=${email}&retmode=json`;
                const summaryResponse = await this.fetchWithRetry(summaryUrl);
                const summaryData = await summaryResponse.json();

                this.sequenceData = {
                    genomic: null,
                    mrna: []
                };

                nucleotideIds.forEach(id => {
                    const seqInfo = summaryData.result[id];
                    if (seqInfo) {
                        const seqObj = {
                            accession: seqInfo.accessionversion || seqInfo.gi,
                            length: seqInfo.slen || 0,
                            description: seqInfo.title || 'No description'
                        };

                        if (seqInfo.accessionversion && seqInfo.accessionversion.startsWith('NG_')) {
                            // RefSeqGene sequence
                            this.sequenceData.genomic = {
                                ...seqObj,
                                type: 'RefSeqGene'
                            };
                        } else if (seqInfo.accessionversion && seqInfo.accessionversion.startsWith('NM_')) {
                            // mRNA sequence
                            this.sequenceData.mrna.push(seqObj);
                        }
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to fetch genomic sequences:', error);
            this.sequenceData = { genomic: null, mrna: [] };
        }
    }

    async fetchEnsemblData() {
        if (!this.geneData || !this.geneData.symbol) return;

        try {
            // First, lookup the gene by symbol
            const lookupUrl = `${this.apis.ensembl}/lookup/symbol/homo_sapiens/${this.geneData.symbol}?expand=1`;
            const lookupResponse = await this.fetchWithRetry(lookupUrl, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (!lookupResponse.ok) {
                throw new Error(`Ensembl lookup failed: ${lookupResponse.status}`);
            }

            const geneInfo = await lookupResponse.json();

            this.exonData = [];

            if (geneInfo.Transcript && Array.isArray(geneInfo.Transcript)) {
                // Process transcripts and their exons
                geneInfo.Transcript.forEach((transcript, tIndex) => {
                    if (transcript.Exon && Array.isArray(transcript.Exon)) {
                        transcript.Exon.forEach((exon, eIndex) => {
                            this.exonData.push({
                                number: eIndex + 1,
                                id: exon.id || `EXON_${tIndex}_${eIndex}`,
                                start: exon.start || 0,
                                end: exon.end || 0,
                                length: (exon.end - exon.start + 1) || 0,
                                strand: exon.strand === 1 ? '+' : '-'
                            });
                        });
                    }
                });
            }

            // Remove duplicates and sort by start position
            const uniqueExons = [];
            const seen = new Set();
            this.exonData.forEach(exon => {
                const key = `${exon.start}-${exon.end}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueExons.push(exon);
                }
            });

            this.exonData = uniqueExons.sort((a, b) => a.start - b.start)
                .map((exon, index) => ({ ...exon, number: index + 1 }));

        } catch (error) {
            console.warn('Failed to fetch Ensembl data:', error);
            this.exonData = [];
        }
    }

    async fetchUniProtData() {
        if (!this.geneData || !this.geneData.symbol) return;

        try {
            // Search UniProt for protein entries with this gene name
            const searchUrl = `${this.apis.uniprot}/uniprotkb/search?query=gene:${this.geneData.symbol} AND organism_id:9606&format=json&size=5`;
            const response = await this.fetchWithRetry(searchUrl);

            if (!response.ok) {
                throw new Error(`UniProt search failed: ${response.status}`);
            }

            const data = await response.json();

            this.proteinData = [];
            if (data.results && Array.isArray(data.results)) {
                data.results.forEach(protein => {
                    this.proteinData.push({
                        accession: protein.primaryAccession,
                        name: protein.uniProtkbId,
                        description: protein.proteinDescription?.recommendedName?.fullName?.value || 'No description',
                        length: protein.sequence?.length || 0,
                        organism: protein.organism?.scientificName || 'Homo sapiens'
                    });
                });
            }
        } catch (error) {
            console.warn('Failed to fetch UniProt data:', error);
            this.proteinData = [];
        }
    }

    async fetchAlphaFoldStructures() {
        if (!this.proteinData || this.proteinData.length === 0) return;

        try {
            // Try to get AlphaFold structure for the first protein
            const primaryProtein = this.proteinData[0];
            if (primaryProtein && primaryProtein.accession) {
                const afUrl = `${this.apis.alphafold}/prediction/${primaryProtein.accession}`;
                const response = await this.fetchWithRetry(afUrl);

                if (response.ok) {
                    const afData = await response.json();
                    this.alphaFoldData = afData[0] || null;
                } else {
                    this.alphaFoldData = null;
                }
            }
        } catch (error) {
            console.warn('Failed to fetch AlphaFold data:', error);
            this.alphaFoldData = null;
        }
    }

    async fetchWithRetry(url, options = {}, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });

                if (response.ok || response.status === 404) {
                    return response;
                }

                if (i === maxRetries - 1) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                await this.delay(1000 * (i + 1)); // Progressive delay
            } catch (error) {
                if (i === maxRetries - 1) {
                    throw error;
                }
                await this.delay(1000 * (i + 1));
            }
        }
    }

    extractChromosome(geneInfo) {
        if (geneInfo.chromosome) return geneInfo.chromosome;
        if (geneInfo.maplocation) {
            const match = geneInfo.maplocation.match(/^(\d+|X|Y|MT)/);
            return match ? match[1] : 'Unknown';
        }
        return 'Unknown';
    }

    extractAliases(geneInfo) {
        const aliases = [];
        if (geneInfo.otheraliases) aliases.push(...geneInfo.otheraliases.split(', '));
        if (geneInfo.otherdesignations) aliases.push(...geneInfo.otherdesignations.split(', '));
        return aliases.slice(0, 10); // Limit to 10 aliases
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showLoadingState() {
        const resultsSection = document.getElementById('results-section');
        const errorSection = document.getElementById('error-section');
        if (resultsSection) resultsSection.classList.add('hidden');
        if (errorSection) errorSection.classList.add('hidden');

        const progressSection = document.getElementById('progress-section');
        if (progressSection) progressSection.classList.remove('hidden');

        const btn = document.getElementById('start-analysis');
        const btnText = btn?.querySelector('.btn-text');
        const btnLoading = btn?.querySelector('.btn-loading');
        if (btnText) btnText.classList.add('hidden');
        if (btnLoading) btnLoading.classList.remove('hidden');
        if (btn) btn.disabled = true;
    }

    hideLoadingState() {
        const progressSection = document.getElementById('progress-section');
        if (progressSection) progressSection.classList.add('hidden');

        const btn = document.getElementById('start-analysis');
        const btnText = btn?.querySelector('.btn-text');
        const btnLoading = btn?.querySelector('.btn-loading');
        if (btnText) btnText.classList.remove('hidden');
        if (btnLoading) btnLoading.classList.add('hidden');
        if (btn) btn.disabled = false;
    }

    displayResults() {
        this.hideLoadingState();

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('fade-in');
        }

        this.populateGeneInfo();
        this.populateSequences();
        this.populateExonTable();
        this.setupDownloads();
        this.loadProteinStructure();

        setTimeout(() => {
            document.querySelectorAll('.collapsible-content').forEach(content => {
                if (!content.classList.contains('collapsed')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }, 100);
    }

    populateGeneInfo() {
        const geneInfoDiv = document.getElementById('gene-info');
        if (!geneInfoDiv || !this.geneData) return;

        geneInfoDiv.innerHTML = `
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Gene Symbol</span>
                    <span class="info-value">${this.geneData.symbol || 'Unknown'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Gene ID</span>
                    <span class="info-value">${this.geneData.geneId || 'Unknown'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Description</span>
                    <span class="info-value">${this.geneData.description || 'No description available'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Organism</span>
                    <span class="info-value">${this.geneData.organism || 'Homo sapiens'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Chromosome</span>
                    <span class="info-value">${this.geneData.chromosome || 'Unknown'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Location</span>
                    <span class="info-value">${this.geneData.location || 'Unknown'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Aliases</span>
                    <span class="info-value">${(this.geneData.aliases && this.geneData.aliases.length > 0) ? this.geneData.aliases.join(', ') : 'None available'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Function</span>
                    <span class="info-value">${this.geneData.function || 'Function not available'}</span>
                </div>
            </div>
        `;
    }

    populateSequences() {
        this.populateGenomicSequences();
        this.populateMRNASequences();
    }

    populateGenomicSequences() {
        const genomicList = document.getElementById('genomic-sequences');
        if (!genomicList) return;

        genomicList.innerHTML = '';

        if (this.sequenceData && this.sequenceData.genomic) {
            const seq = this.sequenceData.genomic;
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="sequence-accession">${seq.accession}</span>
                <span class="sequence-type">${seq.type}</span>
                <span class="sequence-length">${seq.length.toLocaleString()} bp</span>
                <span class="sequence-description">${seq.description}</span>
            `;
            genomicList.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerHTML = '<span class="sequence-description">No genomic sequences found for this gene</span>';
            genomicList.appendChild(li);
        }
    }

    populateMRNASequences() {
        const mrnaList = document.getElementById('mrna-sequences');
        if (!mrnaList) return;

        mrnaList.innerHTML = '';

        if (this.sequenceData && this.sequenceData.mrna && this.sequenceData.mrna.length > 0) {
            this.sequenceData.mrna.forEach(seq => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="sequence-accession">${seq.accession}</span>
                    <span class="sequence-length">${seq.length.toLocaleString()} bp</span>
                    <span class="sequence-description">${seq.description}</span>
                `;
                mrnaList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.innerHTML = '<span class="sequence-description">No mRNA sequences found for this gene</span>';
            mrnaList.appendChild(li);
        }
    }

    populateExonTable() {
        const tbody = document.getElementById('exon-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (this.exonData && this.exonData.length > 0) {
            this.exonData.forEach(exon => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${exon.number}</td>
                    <td><code>${exon.id}</code></td>
                    <td>${exon.start.toLocaleString()}</td>
                    <td>${exon.end.toLocaleString()}</td>
                    <td>${exon.length.toLocaleString()}</td>
                    <td>${exon.strand}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6">No exon data available for this gene</td>';
            tbody.appendChild(row);
        }
    }

    setupDownloads() {
        const fastaBtn = document.getElementById('download-fasta');
        const csvBtn = document.getElementById('download-csv');
        const txtBtn = document.getElementById('download-txt');

        if (fastaBtn) {
            fastaBtn.onclick = () => this.downloadFASTA();
        }
        if (csvBtn) {
            csvBtn.onclick = () => this.downloadCSV();
        }
        if (txtBtn) {
            txtBtn.onclick = () => this.downloadTXT();
        }
    }

    downloadFASTA() {
        if (!this.geneData) {
            this.showError('No gene data available for download');
            return;
        }

        let fastaContent = `>${this.geneData.symbol} | ${this.geneData.description}\n`;

        // Add genomic sequence info if available
        if (this.sequenceData && this.sequenceData.genomic) {
            fastaContent += `>Genomic_${this.sequenceData.genomic.accession}\n`;
            fastaContent += `Sequence information available from NCBI (${this.sequenceData.genomic.length} bp)\n\n`;
        }

        // Add mRNA sequence info if available
        if (this.sequenceData && this.sequenceData.mrna && this.sequenceData.mrna.length > 0) {
            this.sequenceData.mrna.forEach((seq, index) => {
                fastaContent += `>mRNA_${seq.accession}\n`;
                fastaContent += `${seq.description} (${seq.length} bp)\n\n`;
            });
        }

        if (!fastaContent.trim()) {
            fastaContent = `>${this.geneData.symbol}\nNo sequence data available\n`;
        }

        this.downloadFile(fastaContent, `${this.geneData.symbol}_sequences.fasta`, 'text/plain');
    }

    downloadCSV() {
        if (!this.exonData || this.exonData.length === 0) {
            this.showError('No exon data available for download');
            return;
        }

        let csvContent = 'Exon Number,Exon ID,Start Position,End Position,Length,Strand\n';

        this.exonData.forEach(exon => {
            csvContent += `${exon.number},"${exon.id}",${exon.start},${exon.end},${exon.length},${exon.strand}\n`;
        });

        this.downloadFile(csvContent, `${this.geneData.symbol}_exons.csv`, 'text/csv');
    }

    downloadTXT() {
        if (!this.geneData) {
            this.showError('No gene data available for download');
            return;
        }

        let txtContent = `Gene Analysis Report\n`;
        txtContent += `===================\n\n`;
        txtContent += `Gene Symbol: ${this.geneData.symbol}\n`;
        txtContent += `Gene ID: ${this.geneData.geneId}\n`;
        txtContent += `Description: ${this.geneData.description}\n`;
        txtContent += `Organism: ${this.geneData.organism}\n`;
        txtContent += `Chromosome: ${this.geneData.chromosome}\n`;
        txtContent += `Location: ${this.geneData.location}\n`;
        txtContent += `Aliases: ${(this.geneData.aliases && this.geneData.aliases.length > 0) ? this.geneData.aliases.join(', ') : 'None'}\n`;
        txtContent += `Function: ${this.geneData.function}\n\n`;

        if (this.sequenceData && this.sequenceData.genomic) {
            txtContent += `Genomic Sequence:\n`;
            txtContent += `- Accession: ${this.sequenceData.genomic.accession}\n`;
            txtContent += `- Type: ${this.sequenceData.genomic.type}\n`;
            txtContent += `- Length: ${this.sequenceData.genomic.length} bp\n\n`;
        }

        if (this.sequenceData && this.sequenceData.mrna && this.sequenceData.mrna.length > 0) {
            txtContent += `mRNA Sequences:\n`;
            this.sequenceData.mrna.forEach((seq, index) => {
                txtContent += `- ${seq.accession}: ${seq.description} (${seq.length} bp)\n`;
            });
            txtContent += '\n';
        }

        if (this.exonData && this.exonData.length > 0) {
            txtContent += `Exon Information:\n`;
            txtContent += `Total Exons: ${this.exonData.length}\n\n`;
            this.exonData.forEach(exon => {
                txtContent += `Exon ${exon.number}: ${exon.id} (${exon.start}-${exon.end}, ${exon.length} bp, ${exon.strand})\n`;
            });
        }

        this.downloadFile(txtContent, `${this.geneData.symbol}_analysis.txt`, 'text/plain');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showSuccessToast(`${filename} downloaded successfully!`);
    }

    async loadProteinStructure() {
        const structureViewer = document.getElementById('structure-viewer');
        const structureInfo = document.getElementById('structure-info');

        if (!structureViewer || !structureInfo) return;

        if (this.alphaFoldData && this.alphaFoldData.pdbUrl) {
            try {
                // Initialize NGL viewer if not already done
                if (!this.nglStage) {
                    this.nglStage = new NGL.Stage(structureViewer);
                    this.nglStage.setSize('100%', '400px');
                }

                // Clear existing structures
                this.nglStage.removeAllComponents();

                // Load AlphaFold structure
                const component = await this.nglStage.loadFile(this.alphaFoldData.pdbUrl);
                component.addRepresentation('cartoon', { colorScheme: 'bfactor' });
                this.nglStage.autoView();

                // Update structure info
                structureInfo.innerHTML = `
                    <div class="structure-item">
                        <span class="structure-label">Protein</span>
                        <span class="structure-value">${this.alphaFoldData.uniprotId || 'Unknown'}</span>
                    </div>
                    <div class="structure-item">
                        <span class="structure-label">Model Confidence</span>
                        <span class="structure-value">AlphaFold Prediction</span>
                    </div>
                    <div class="structure-item">
                        <span class="structure-label">Source</span>
                        <span class="structure-value">AlphaFold Database</span>
                    </div>
                `;
            } catch (error) {
                console.error('Failed to load protein structure:', error);
                this.showDefaultStructureMessage();
            }
        } else {
            this.showDefaultStructureMessage();
        }
    }

    showDefaultStructureMessage() {
        const structureViewer = document.getElementById('structure-viewer');
        const structureInfo = document.getElementById('structure-info');

        if (structureViewer) {
            structureViewer.innerHTML = `
                <div class="structure-placeholder">
                    <div class="placeholder-icon">🔬</div>
                    <div class="placeholder-text">
                        <h3>Protein Structure Not Available</h3>
                        <p>No AlphaFold structure found for this gene's protein products.</p>
                        <p>This could be because:</p>
                        <ul>
                            <li>The protein structure hasn't been predicted by AlphaFold</li>
                            <li>No UniProt entry was found for this gene</li>
                            <li>The gene doesn't code for a protein</li>
                        </ul>
                    </div>
                </div>
            `;
        }

        if (structureInfo) {
            structureInfo.innerHTML = `
                <div class="structure-item">
                    <span class="structure-label">Status</span>
                    <span class="structure-value">Structure not available</span>
                </div>
            `;
        }
    }

    showError(message) {
        this.hideLoadingState();

        const errorSection = document.getElementById('error-section');
        const errorMessage = document.getElementById('error-message');

        if (errorSection && errorMessage) {
            errorMessage.textContent = message;
            errorSection.classList.remove('hidden');
        }

        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.add('hidden');
        }

        this.isAnalyzing = false;
    }

    resetAnalysis() {
        const errorSection = document.getElementById('error-section');
        const resultsSection = document.getElementById('results-section');
        const progressSection = document.getElementById('progress-section');

        if (errorSection) errorSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
        if (progressSection) progressSection.classList.add('hidden');

        // Reset form
        const geneInput = document.getElementById('gene-input');
        const emailInput = document.getElementById('email-input');
        if (geneInput) geneInput.value = '';
        if (emailInput) emailInput.value = '';

        // Reset internal state
        this.geneData = null;
        this.sequenceData = null;
        this.exonData = null;
        this.proteinData = null;
        this.alphaFoldData = null;
        this.currentGene = null;
        this.isAnalyzing = false;
    }

    showSuccessToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');

        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
        }
    }

    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.remove('show');
        }
    }
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeneAnalysisPlatform();
});
