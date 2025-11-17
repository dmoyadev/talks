import process from 'node:process';
import { x } from 'tinyexec';

const [base, ...args] = process.argv.slice(2);

const cwd = process.cwd();

const command = ['slidev', 'build', '--base', base, '--out', `../../dist${base}`, ...args];

console.log('Building', command.join(' '));

await x('npx', command, {
	nodeOptions: {
		cwd,
		stdio: 'inherit',
	},
});