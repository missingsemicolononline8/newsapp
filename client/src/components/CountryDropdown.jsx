import React, { useContext } from 'react';
import { countryContext } from '../context/CountryContext';

const CountryDropdown = () => {
    const countryOptions = {
        ar: 'Argentina',
        au: 'Australia',
        at: 'Austria',
        be: 'Belgium',
        br: 'Brazil',
        bg: 'Bulgaria',
        ca: 'Canada',
        cn: 'China',
        co: 'Colombia',
        cz: 'Czech Republic',
        eg: 'Egypt',
        fr: 'France',
        de: 'Germany',
        gr: 'Greece',
        hk: 'Hong Kong',
        hu: 'Hungary',
        in: 'India',
        id: 'Indonesia',
        ie: 'Ireland',
        il: 'Israel',
        it: 'Italy',
        jp: 'Japan',
        lv: 'Latvia',
        lt: 'Lithuania',
        my: 'Malaysia',
        mx: 'Mexico',
        ma: 'Morocco',
        nl: 'Netherlands',
        nz: 'New Zealand',
        ng: 'Nigeria',
        no: 'Norway',
        ph: 'Philippines',
        pl: 'Poland',
        pt: 'Portugal',
        ro: 'Romania',
        sa: 'Saudi Arabia',
        rs: 'Serbia',
        sg: 'Singapore',
        sk: 'Slovakia',
        si: 'Slovenia',
        za: 'South Africa',
        kr: 'South Korea',
        se: 'Sweden',
        ch: 'Switzerland',
        tw: 'Taiwan',
        th: 'Thailand',
        tr: 'Turkey',
        ae: 'United Arab Emirates',
        ua: 'Ukraine',
        gb: 'United Kingdom',
        us: 'United States',
        ve: 'Venezuela',
    };

    const { country, setCountry } = useContext(countryContext);

    const handleCountryChange = (event) => {
        const selectedValue = event.target.value;
        setCountry(selectedValue);
    };

    return (
        <div className="d-flex align-items-center">
            <label htmlFor="countryDropdown" className="form-label text-light flex-grow-1 mb-0 me-2">Country</label>
            <select
                id="countryDropdown"
                className="form-select flex-shrink-1"
                value={country}
                style={{ width: "unset" }}
                onChange={handleCountryChange}
            >
                <option value="">Select...</option>
                {Object.entries(countryOptions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
    );
};

export default CountryDropdown;
